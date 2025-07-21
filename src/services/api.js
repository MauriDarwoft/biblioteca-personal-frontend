const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"
const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_BASE_API_URL : "http://localhost:2222/api"

// Función helper para manejar respuestas de la API
const handleResponse = async (response) => {
  let data
  try {
    data = await response.json()
  } catch (error) {
    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
  }

  if (!response.ok) {
    // Si hay errores de validación, mostrarlos de forma legible
    if (data.errors && Array.isArray(data.errors)) {
      const errorMessages = data.errors.map((err) => `${err.field}: ${err.message}`).join(", ")
      throw new Error(errorMessages)
    }

    // Si hay un mensaje de error específico
    if (data.message) {
      throw new Error(data.message)
    }

    // Error genérico
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return data
}

// Función helper para hacer requests con manejo de errores
const apiRequest = async (url, options = {}) => {
  try {
    // Asegurar que siempre tengamos los headers correctos
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    const requestOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    console.log(`🌐 API Request: ${requestOptions.method || "GET"} ${url}`)
    console.log(`📦 Headers:`, requestOptions.headers)
    console.log(`📦 Body:`, requestOptions.body ? JSON.parse(requestOptions.body) : "No body")

    const response = await fetch(url, requestOptions)

    const result = await handleResponse(response)
    console.log(`✅ API Response:`, result)
    return result
  } catch (error) {
    console.error(`❌ API Error:`, error)
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.")
    }
    throw error
  }
}

// ===== BOOKS API =====
export const getBooks = async (token) => {
  const data = await apiRequest(`${API_URL}/books`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.data || data
}

export const createBook = async (bookData, token) => {
  // Validación básica en el frontend
  if (!bookData.title?.trim()) {
    throw new Error("El título del libro es requerido")
  }

  const payload = {
    title: bookData.title.trim(),
    author: bookData.author?.trim() || "",
    status: bookData.status || "por_leer",
  }

  console.log("📚 Enviando libro:", payload)

  const data = await apiRequest(`${API_URL}/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  return data.data || data
}

export const updateBook = async (id, bookData, token) => {
  if (!id) {
    throw new Error("ID del libro es requerido")
  }

  const data = await apiRequest(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  })
  return data.data || data
}

export const deleteBook = async (id, token) => {
  if (!id) {
    throw new Error("ID del libro es requerido")
  }

  await apiRequest(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// ===== AUTH API =====
export const loginUser = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Email y contraseña son requeridos")
  }

  const data = await apiRequest(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  })
  return data
}

export const registerUser = async (userData) => {
  if (!userData.email || !userData.password) {
    throw new Error("Email y contraseña son requeridos")
  }

  if (userData.password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres")
  }

  const data = await apiRequest(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  })
  return data
}

export const updateProfile = async (profileData, token) => {
  const data = await apiRequest(`${API_URL}/auth/profile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  })
  return data
}

export const changePassword = async (passwordData, token) => {
  if (!passwordData.currentPassword || !passwordData.newPassword) {
    throw new Error("Contraseña actual y nueva son requeridas")
  }

  if (passwordData.newPassword.length < 6) {
    throw new Error("La nueva contraseña debe tener al menos 6 caracteres")
  }

  const data = await apiRequest(`${API_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  })
  return data
}
