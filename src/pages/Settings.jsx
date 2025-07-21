import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/authContext"

const Settings = () => {
  const { user, token } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"
  const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_BASE_API_URL : "http://localhost:2222/api"

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar perfil")
      }

      setMessage("Perfil actualizado correctamente")
      setIsEditing(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar contraseña")
      }

      setMessage("Contraseña cambiada correctamente")
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="settings-container">
        <div className="settings-header">
          <h1>
            <i className="bx bx-cog"></i>
            Configuración de Usuario
          </h1>
          <p>Gestiona tu perfil y configuración de cuenta</p>
        </div>

        {message && (
          <div className="success-message">
            <i className="bx bx-check-circle"></i>
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="bx bx-error"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="settings-content">
          {/* Profile Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2>
                <i className="bx bx-user"></i>
                Información del Perfil
              </h2>
              <button onClick={() => setIsEditing(!isEditing)} className="edit-toggle-btn">
                <i className={`bx ${isEditing ? "bx-x" : "bx-edit"}`}></i>
                {isEditing ? "Cancelar" : "Editar"}
              </button>
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-item">
                  <label>Nombre:</label>
                  <span>{user?.name || "No especificado"}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                </div>
                <div className="info-item">
                  <label>ID de Usuario:</label>
                  <span>{user?.userId}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                  />
                </div>
                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? (
                    <>
                      <i className="bx bx-loader-alt bx-spin"></i>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-save"></i>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Password Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2>
                <i className="bx bx-lock"></i>
                Cambiar Contraseña
              </h2>
            </div>

            <form onSubmit={handleChangePassword} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña Actual:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Tu contraseña actual"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Nueva contraseña (mín. 6 caracteres)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirma tu nueva contraseña"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="change-password-btn">
                {loading ? (
                  <>
                    <i className="bx bx-loader-alt bx-spin"></i>
                    Cambiando...
                  </>
                ) : (
                  <>
                    <i className="bx bx-key"></i>
                    Cambiar Contraseña
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Account Stats */}
          <div className="settings-section">
            <div className="section-header">
              <h2>
                <i className="bx bx-bar-chart"></i>
                Estadísticas de Cuenta
              </h2>
            </div>

            <div className="account-stats">
              <div className="stat-item">
                <i className="bx bx-calendar"></i>
                <div>
                  <span className="stat-label">Miembro desde:</span>
                  <span className="stat-value">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No disponible"}
                  </span>
                </div>
              </div>
              <div className="stat-item">
                <i className="bx bx-time"></i>
                <div>
                  <span className="stat-label">Último acceso:</span>
                  <span className="stat-value">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Ahora"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Settings }