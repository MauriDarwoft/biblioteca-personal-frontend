import { Outlet } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"
import { useBooks } from "../hooks/useBooks"

const Dashboard = () => {
  const { user } = useAuth()
  const { books } = useBooks()

  const stats = {
    total: books.length,
    leidos: books.filter((b) => b.status === "leido").length,
    porLeer: books.filter((b) => b.status === "por_leer").length,
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard - Biblioteca Personal</h1>
          {user && (
            <div className="user-info">
              <p>
                <strong>Usuario:</strong> {user.name || user.email}
              </p>
              <p>
                <strong>ID:</strong> {user.userId}
              </p>
            </div>
          )}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bx bx-book"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total de Libros</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bx bx-book-open"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.leidos}</h3>
              <p>Libros Leídos</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bx bx-bookmark"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.porLeer}</h3>
              <p>Por Leer</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bx bx-trending-up"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.total > 0 ? Math.round((stats.leidos / stats.total) * 100) : 0}%</h3>
              <p>Progreso</p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </Layout>
  )
}

export { Dashboard }