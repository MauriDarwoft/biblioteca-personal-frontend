import { useState } from "react"
import { BookItem } from "./BookItem"

const BookList = ({ books, onDelete, onStatusChange, onUpdate }) => {
  const [filter, setFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "todos" || book.status === filter
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const bookCounts = {
    total: books.length,
    leidos: books.filter((b) => b.status === "leido").length,
    porLeer: books.filter((b) => b.status === "por_leer").length,
  }

  return (
    <div className="book-list-container">
      <div className="book-stats">
        <div className="stat">
          <span className="stat-number">{bookCounts.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{bookCounts.leidos}</span>
          <span className="stat-label">Leídos</span>
        </div>
        <div className="stat">
          <span className="stat-number">{bookCounts.porLeer}</span>
          <span className="stat-label">Por Leer</span>
        </div>
      </div>

      <div className="book-filters">
        <div className="search-box">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button className={filter === "todos" ? "active" : ""} onClick={() => setFilter("todos")}>
            Todos
          </button>
          <button className={filter === "por_leer" ? "active" : ""} onClick={() => setFilter("por_leer")}>
            Por Leer
          </button>
          <button className={filter === "leido" ? "active" : ""} onClick={() => setFilter("leido")}>
            Leídos
          </button>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="bx bx-book"></i>
          <h3>No hay libros</h3>
          <p>
            {searchTerm || filter !== "todos"
              ? "No se encontraron libros con los filtros aplicados"
              : "Comienza agregando tu primer libro a la biblioteca"}
          </p>
        </div>
      )}
    </div>
  )
}

export { BookList }