# 📚 Mi Biblioteca Personal - Frontend

Aplicación web para gestionar tu colección de libros, permitiéndote registrar, iniciar sesión, y llevar un control de tus libros leídos y por leer. Desarrollada con React y Vite por Mauricio Fredes.

## 🚀 Características

- **Autenticación de Usuarios**: Registro e inicio de sesión seguro con JWT.
- **Gestión de Libros**: Agrega, edita, elimina y cambia el estado de tus libros (leído/por leer).
- **Búsqueda y Filtrado**: Busca libros por título o autor, y filtra por estado.
- **Estadísticas de Biblioteca**: Visualiza un dashboard con el total de libros, leídos, por leer y tu progreso.
- **Reconocimiento de Voz**: Agrega libros usando tu voz (solo título).
- **Diseño Responsivo**: Adaptado para dispositivos móviles y de escritorio.
- **Manejo de Errores**: Interfaz amigable para errores de conexión o validación.

## 💻 Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos web.
- **React Router DOM**: Para la navegación en la aplicación.
- **Context API**: Para la gestión del estado de autenticación.
- **Web Speech API**: Para la funcionalidad de reconocimiento de voz.
- **CSS Puro**: Para los estilos de la aplicación.

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- El backend de la aplicación debe estar corriendo (localmente o desplegado).

## 🛠️ Instalación (Desarrollo Local)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MauriDarwoft/biblioteca-personal-frontend.git
   cd biblioteca-personal-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` para apuntar a tu backend. Si estás usando el backend desplegado en Render.com, tu `.env` debería verse así:
   ```env
   VITE_BASE_API_URL=https://biblioteca-personal-backend.onrender.com/api
   VITE_NODE_DEV=production
   ```
   
   Si estás corriendo el backend localmente, usa:
   ```env
   VITE_BASE_API_URL=http://localhost:2222/api
   VITE_NODE_DEV=development
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`.

## 🌐 Despliegue

Este frontend está desplegado en [Vercel](https://vercel.com/).

**URL del Frontend Desplegado:** [https://biblioteca-personal-frontend.vercel.app](https://biblioteca-personal-frontend.vercel.app)

### Configuración en Vercel

Para desplegar en Vercel, asegúrate de configurar las siguientes variables de entorno en tu proyecto:

- `VITE_BASE_API_URL`: La URL de tu backend desplegado (ej. `https://biblioteca-personal-backend.onrender.com/api`).
- `VITE_NODE_DEV`: `production`

## 📖 Uso de la Aplicación

1.  **Registro**: Crea una nueva cuenta en la página de registro.
2.  **Inicio de Sesión**: Inicia sesión con tus credenciales.
3.  **Biblioteca**: Una vez dentro, podrás ver tus libros, agregar nuevos, editarlos, eliminarlos o cambiar su estado.
4.  **Dashboard**: Accede al dashboard para ver estadísticas de tu colección.
5.  **Configuración**: Gestiona tu perfil de usuario.

## 🏗️ Estructura del Proyecto

```
frontend/
├── public/
│   └── icon.png
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── BookForm.jsx
│   │   ├── BookItem.tsx
│   │   ├── BookList.tsx
│   │   ├── Boton.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Nombre.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   └── authContext.jsx
│   ├── hooks/
│   │   └── useBooks.js
│   ├── pages/
│   │   ├── Ajustes.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Settings.jsx
│   ├── router/
│   │   └── RouterApp.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

¿Tienes preguntas o sugerencias? ¡Abre un issue o contacta al desarrollador!
