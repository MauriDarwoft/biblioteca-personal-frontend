import { Layout } from "../components/Layout"
import { useBooks } from "../hooks/useBooks"
import { BookForm } from "../components/BookForm"
import { BookList } from "../components/BookList"

const Home = () => {
  const {
    books,
    loader,
    error,
    isListening,
    toggleListening,
    addBook,
    handleDelete,
    handleStatusChange,
    updateBookInfo,
  } = useBooks()

  return (
    <Layout>
      <div className="library-container">
        <div className="library-header">
          <h1>
            <i className="bx bx-library"></i>
            Mi Biblioteca Personal
          </h1>
          <p>Gestiona tu colección de libros leídos y por leer</p>
        </div>

        {loader && (
          <div className="loading">
            <i className="bx bx-loader-alt bx-spin"></i>
            <span>Cargando biblioteca...</span>
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="bx bx-error"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="library-content">
          <BookForm onAddBook={addBook} isListening={isListening} toggleListening={toggleListening} />

          <BookList
            books={books}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onUpdate={updateBookInfo}
          />
        </div>
      </div>
    </Layout>
  )
}

export { Home }
