import { useState } from "react"

const BookForm = ({ onAddBook, isListening, toggleListening }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [status, setStatus] = useState("por_leer")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === "") return

    onAddBook(title.trim(), author.trim(), status)
    setTitle("")
    setAuthor("")
    setStatus("por_leer")
  }

  return (
    <div className="book-form-container">
      <h2>Agregar Nuevo Libro</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Título del libro *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className="form-group">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="por_leer">Por Leer</option>
            <option value="leido">Leído</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">
            <i className="bx bx-plus"></i>
            Agregar Libro
          </button>

          {window.SpeechRecognition || window.webkitSpeechRecognition ? (
            <button type="button" onClick={toggleListening} className={isListening ? "listening" : ""}>
              <i className={`bx ${isListening ? "bx-stop" : "bx-microphone"}`}></i>
              {isListening ? "Grabando..." : "Grabar Título"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export { BookForm }