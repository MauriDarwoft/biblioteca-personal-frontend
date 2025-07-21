import { useState } from "react"

const BookItem = ({ book, onDelete, onStatusChange, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(book.title)
  const [editAuthor, setEditAuthor] = useState(book.author || "")

  const handleSave = async () => {
    try {
      await onUpdate(book._id, {
        title: editTitle.trim(),
        author: editAuthor.trim(),
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  const handleCancel = () => {
    setEditTitle(book.title)
    setEditAuthor(book.author || "")
    setIsEditing(false)
  }

  return (
    <div className={`book-item ${book.status}`}>
      <div className="book-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título del libro"
            />
            <input type="text" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} placeholder="Autor" />
            <div className="edit-actions">
              <button onClick={handleSave} className="save-btn">
                <i className="bx bx-check"></i>
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                <i className="bx bx-x"></i>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              {book.author && <p className="book-author">por {book.author}</p>}
            </div>

            <div className="book-status">
              <span className={`status-badge ${book.status}`}>{book.status === "leido" ? "Leído" : "Por Leer"}</span>
            </div>
          </>
        )}
      </div>

      <div className="book-actions">
        <button
          onClick={() => onStatusChange(book)}
          className="status-btn"
          title={book.status === "leido" ? "Marcar como no leído" : "Marcar como leído"}
        >
          <i className={`bx ${book.status === "leido" ? "bx-book-open" : "bx-book"}`}></i>
        </button>

        <button onClick={() => setIsEditing(!isEditing)} className="edit-btn" title="Editar libro">
          <i className="bx bx-edit"></i>
        </button>

        <button onClick={() => onDelete(book._id)} className="delete-btn" title="Eliminar libro">
          <i className="bx bx-trash"></i>
        </button>
      </div>
    </div>
  )
}

export { BookItem }