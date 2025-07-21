import { useEffect, useState, useRef } from "react"
import { createBook, deleteBook, getBooks, updateBook } from "../services/api"
import { useAuth } from "../context/authContext"

const useBooks = () => {
  const [books, setBooks] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const { token } = useAuth()

  useEffect(() => {
    const fetchingBooks = async () => {
      if (!token) return

      setLoader(true)
      setError(null)
      try {
        const books = await getBooks(token)
        setBooks(books)
      } catch (error) {
        console.error("Error fetching books:", error)
        setError("Error al recuperar los libros. Por favor, intenta de nuevo.")
      } finally {
        setLoader(false)
      }
    }

    fetchingBooks()
  }, [token])

  useEffect(() => {
    // Inicializar reconocimiento de voz solo si está disponible
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()

      recognition.lang = "es-AR"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim()
        const formattedTitle = transcript.charAt(0).toUpperCase() + transcript.slice(1)
        addBook(formattedTitle)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setError("Error en el reconocimiento de voz. Intenta de nuevo.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("El reconocimiento de voz no está disponible en tu navegador")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setError(null)
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const addBook = async (title, author = "", status = "por_leer") => {
    if (!title.trim()) {
      setError("El título del libro es requerido")
      return
    }

    try {
      setError(null)
      const bookData = {
        title: title.trim(),
        author: author.trim(),
        status,
      }

      const data = await createBook(bookData, token)
      setBooks((prev) => [data, ...prev])
      return data
    } catch (error) {
      console.error("Error adding book:", error)
      setError(error.message || "Error al agregar el libro")
      throw error
    }
  }

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este libro?")
      if (!confirmed) return

      setError(null)
      await deleteBook(id, token)
      setBooks(books.filter((b) => b._id !== id))
    } catch (error) {
      console.error("Error deleting book:", error)
      setError(error.message || "Error al eliminar el libro")
    }
  }

  const handleStatusChange = async (book) => {
    try {
      setError(null)
      const newStatus = book.status === "leido" ? "por_leer" : "leido"
      const data = await updateBook(book._id, { status: newStatus }, token)
      setBooks(books.map((b) => (b._id === book._id ? data : b)))
    } catch (error) {
      console.error("Error updating book status:", error)
      setError(error.message || "Error al actualizar el estado del libro")
    }
  }

  const updateBookInfo = async (id, bookData) => {
    try {
      setError(null)
      const data = await updateBook(id, bookData, token)
      setBooks(books.map((b) => (b._id === id ? data : b)))
      return data
    } catch (error) {
      console.error("Error updating book:", error)
      setError(error.message || "Error al actualizar el libro")
      throw error
    }
  }

  const clearError = () => setError(null)

  return {
    books,
    loader,
    error,
    isListening,
    toggleListening,
    addBook,
    handleDelete,
    handleStatusChange,
    updateBookInfo,
    clearError,
  }
}

export { useBooks }
