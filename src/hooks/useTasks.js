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
      setLoader(true)
      try {
        const books = await getBooks(token)
        setBooks(books)
      } catch (error) {
        setError("Error al recuperar los libros")
      } finally {
        setLoader(false)
      }
    }

    if (token) fetchingBooks()
  }, [token])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()

      recognition.lang = "es-AR"
      recognition.continuous = true
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim()
        addBook(transcript.charAt(0).toUpperCase() + transcript.slice(1))
      }

      recognitionRef.current = recognition
    }
  }, [])

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        recognitionRef.current.start()
      }
      setIsListening(!isListening)
    }
  }

  const addBook = async (title, author = "", status = "por_leer") => {
    try {
      const data = await createBook({ title, author, status }, token)
      setBooks((prev) => [data, ...prev])
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Estás seguro de que quieres borrar este libro?")) {
        await deleteBook(id, token)
        setBooks(books.filter((b) => b._id !== id))
      }
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }

  const handleStatusChange = async (book) => {
    try {
      const newStatus = book.status === "leido" ? "por_leer" : "leido"
      const data = await updateBook(book._id, { status: newStatus }, token)
      setBooks(books.map((b) => (b._id === book._id ? data : b)))
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }

  const updateBookInfo = async (id, bookData) => {
    try {
      const data = await updateBook(id, bookData, token)
      setBooks(books.map((b) => (b._id === id ? data : b)))
      return data
    } catch (error) {
      console.error(error.message)
      setError(error.message)
      throw error
    }
  }

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
  }
}

export { useBooks }