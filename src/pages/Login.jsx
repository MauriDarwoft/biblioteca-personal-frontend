import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { loginUser } from "../services/api"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to intended page after login
  const from = location.state?.from?.pathname || "/dashboard"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await loginUser({ email, password })
      login(data)
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <Layout>
        <div className="already-logged">
          <h2>Ya has iniciado sesión</h2>
          <p>Bienvenido de vuelta, {user.name || user.email}!</p>
          <button onClick={() => navigate("/dashboard")} className="dashboard-btn">
            <i className="bx bx-bar-chart"></i>
            Ir al Dashboard
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <i className="bx bx-loader-alt bx-spin"></i>
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </Layout>
  )
}

export { Login }