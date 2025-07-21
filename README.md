# 📚 Mi Biblioteca Personal

Una aplicación web completa para la gestión de una biblioteca personal, construida con React (Frontend) y Node.js + Express + MongoDB (Backend).

## 🚀 Características

### Frontend (React + Vite)
- ✅ **Autenticación completa**: Registro, login y logout
- ✅ **Rutas protegidas**: Solo usuarios autenticados pueden acceder
- ✅ **Gestión de libros**: Agregar, editar, eliminar y cambiar estado
- ✅ **Filtros y búsqueda**: Por estado (leído/por leer) y texto
- ✅ **Dashboard con estadísticas**: Progreso de lectura y métricas
- ✅ **Página de configuración**: Editar perfil y cambiar contraseña
- ✅ **Reconocimiento de voz**: Agregar libros por voz (opcional)
- ✅ **Diseño responsive**: Funciona en móviles y desktop
- ✅ **Manejo de errores**: Mensajes claros y error boundaries

### Backend (Node.js + Express + MongoDB)
- ✅ **API RESTful**: Endpoints organizados y documentados
- ✅ **Autenticación JWT**: Tokens seguros para sesiones
- ✅ **Base de datos MongoDB**: Modelos para usuarios y libros
- ✅ **Validación de datos**: Entrada validada en todas las rutas
- ✅ **Rutas protegidas**: Middleware de autenticación
- ✅ **Manejo de errores**: Respuestas consistentes
- ✅ **Seguridad**: Hashing de contraseñas y validaciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación y rutas
- **Context API** - Manejo de estado global
- **Boxicons** - Iconografía
- **CSS3** - Estilos con gradientes y animaciones

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **bcrypt** - Hashing de contraseñas
- **cors** - Cross-Origin Resource Sharing

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### 1. Clonar el repositorio
\`\`\`bash
git clone <url-del-repositorio>
cd biblioteca-personal
\`\`\`

### 2. Configurar el Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Crear archivo \`.env\` en la carpeta backend:
\`\`\`env
PORT=2222
MONGODB_URI=mongodb://localhost:27017/biblioteca
JWT_SECRET=tu_jwt_secret_muy_seguro
NODE_ENV=development
\`\`\`

Iniciar el servidor:
\`\`\`bash
npm run dev
\`\`\`

### 3. Configurar el Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

Crear archivo \`.env\` en la carpeta frontend:
\`\`\`env
VITE_NODE_DEV=development
VITE_BASE_API_URL=http://localhost:2222/api
\`\`\`

Iniciar la aplicación:
\`\`\`bash
npm run dev
\`\`\`

## 🔗 Endpoints de la API

### Autenticación
- \`POST /api/auth/register\` - Registrar usuario
- \`POST /api/auth/login\` - Iniciar sesión
- \`PATCH /api/auth/profile\` - Actualizar perfil
- \`PATCH /api/auth/change-password\` - Cambiar contraseña

### Libros (Rutas Protegidas)
- \`GET /api/books\` - Obtener libros del usuario
- \`POST /api/books\` - Crear nuevo libro
- \`PATCH /api/books/:id\` - Actualizar libro
- \`DELETE /api/books/:id\` - Eliminar libro

## 📱 Uso de la Aplicación

### 1. Registro y Login
1. Accede a la aplicación
2. Regístrate con email y contraseña
3. Inicia sesión para acceder a tu biblioteca

### 2. Gestión de Libros
1. **Agregar**: Usa el formulario o reconocimiento de voz
2. **Filtrar**: Por estado (todos, leídos, por leer)
3. **Buscar**: Por título o autor
4. **Editar**: Haz clic en el ícono de edición
5. **Cambiar estado**: Marca como leído/por leer
6. **Eliminar**: Confirma la eliminación

### 3. Dashboard
- Ve estadísticas de tu biblioteca
- Progreso de lectura
- Métricas generales

### 4. Configuración
- Edita tu perfil (nombre, email)
- Cambia tu contraseña
- Ve estadísticas de cuenta

## 🔒 Seguridad

- **Contraseñas hasheadas** con bcrypt
- **Tokens JWT** para autenticación
- **Rutas protegidas** con middleware
- **Validación de entrada** en frontend y backend
- **Manejo seguro de errores**

## 🎨 Características de UI/UX

- **Diseño moderno** con gradientes y glassmorphism
- **Animaciones suaves** y transiciones
- **Responsive design** para todos los dispositivos
- **Estados de carga** y feedback visual
- **Manejo de errores** con mensajes claros
- **Accesibilidad** con iconos y labels

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
1. Build del proyecto: \`npm run build\`
2. Subir carpeta \`dist\` al servicio
3. Configurar variables de entorno

### Backend (Railway/Heroku)
1. Configurar variables de entorno
2. Conectar a MongoDB Atlas
3. Desplegar desde repositorio

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature: \`git checkout -b feature/nueva-funcionalidad\`
3. Commit cambios: \`git commit -m 'Agregar nueva funcionalidad'\`
4. Push a la rama: \`git push origin feature/nueva-funcionalidad\`
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la gestión de bibliotecas personales.

---

¿Tienes preguntas o sugerencias? ¡Abre un issue o contacta al desarrollador!
