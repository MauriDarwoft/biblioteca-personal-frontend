import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Dashboard } from "../pages/Dashboard"
import { Settings } from "../pages/Settings"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { ErrorBoundary } from "../components/ErrorBoundary"

const RouterApp = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Rutas Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <div className="not-found-content">
                  <i className="bx bx-error-404"></i>
                  <h2>Página no encontrada</h2>
                  <p>La página que buscas no existe.</p>
                  <a href="/" className="home-link">
                    <i className="bx bx-home"></i>
                    Volver al inicio
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export { RouterApp }