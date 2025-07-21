import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <i className="bx bx-error-circle"></i>
            <h2>¡Oops! Algo salió mal</h2>
            <p>Ha ocurrido un error inesperado en la aplicación.</p>
            <button onClick={() => window.location.reload()} className="reload-btn">
              <i className="bx bx-refresh"></i>
              Recargar Página
            </button>
            {process.env.NODE_ENV === "development" && (
              <details className="error-details">
                <summary>Detalles del error (solo en desarrollo)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }