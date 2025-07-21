import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/authContext"

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth()
  const location = useLocation()

  if (!user || !token) {
    // Guardar la ubicación a la que el usuario intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export { ProtectedRoute }
