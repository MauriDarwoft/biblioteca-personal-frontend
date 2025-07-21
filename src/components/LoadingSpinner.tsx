const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner">
        <i className="bx bx-loader-alt bx-spin"></i>
      </div>
      <p>{message}</p>
    </div>
  )
}

export { LoadingSpinner }