import { useState } from "react"
import { Layout } from "../components/Layout"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { registerUser } from "../services/api"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const data = await registerUser({ name, email, password })
      login(data)
      navigate("/dashboard")
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
          <h2>Ya tienes una cuenta activa</h2>
          <p>Hola, {user.name || user.email}! 😎</p>
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
        <h2>Crear Cuenta</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
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
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <i className="bx bx-loader-alt bx-spin"></i>
              Creando cuenta...
            </>
          ) : (
            "Crear Cuenta"
          )}
        </button>
        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </Layout>
  )
}

export { Register }