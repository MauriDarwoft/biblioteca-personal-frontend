import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <header>
        <div className="header-content">
          <div className="logo">
            <i className="bx bx-library"></i>
            <span>Mi Biblioteca</span>
          </div>

          <nav>
            <ul>
              {user && (
                <>
                  <li>
                    <Link to="/">
                      <i className="bx bx-home"></i> Biblioteca
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <i className="bx bx-bar-chart"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <i className="bx bx-cog"></i> Configuración
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      <i className="bx bx-log-out"></i>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li>
                    <Link to="/login">
                      <i className="bx bx-log-in"></i> Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <i className="bx bx-user-plus"></i> Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="footer-content">
          <p>
            <i className="bx bx-book-heart"></i>
            Biblioteca Personal - Gestiona tu colección de libros
          </p>
        </div>
      </footer>
    </>
  )
}

export { Layout }