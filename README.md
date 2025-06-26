# 🎯 Transcript App - Aplicación de Transcripción de Voz en Tiempo Real

**Desarrollo Web con Inteligencia Artificial – Centro de e-Learning UTN FRBA**

Una aplicación fullstack desarrollada como parte del curso de Desarrollo Web con IA, diseñada como herramienta inclusiva que permite a personas con discapacidad auditiva acceder a transcripciones en tiempo real de conversaciones, clases y conferencias.

## 🏗️ Arquitectura del Proyecto

```
transcript-app/
├── frontend/          # Cliente React con Vite
├── backend/           # Servidor Node.js con Express
├── package.json       # Configuración del monorepo
└── README.md         # Este archivo
```

## 🧩 Características Principales

### Frontend (React + Vite)
- **Transcripción en tiempo real** usando Web Speech API
- **Interfaz accesible** con modo claro/oscuro
- **Soporte multiidioma**: español, inglés, portugués, francés, alemán, italiano
- **Atajos de teclado** para navegación sin mouse
- **Exportación a TXT** de transcripciones
- **Responsive design** optimizado para todos los dispositivos
- **Pantalla completa** para presentaciones y conferencias

### Backend (Node.js + Express + MongoDB)
- **API RESTful** para gestión de transcripciones
- **Autenticación JWT** segura
- **Base de datos MongoDB** para persistencia
- **Validación con Zod** para datos de entrada
- **Middleware de autenticación** para rutas protegidas
- **Gestión de usuarios** con registro y login
- **CORS configurado** para desarrollo local

### Funcionalidades de Usuario
- **Registro e inicio de sesión** con email y contraseña
- **Historial de transcripciones** personalizado por usuario
- **Búsqueda y filtrado** en el historial
- **Descarga individual o masiva** de transcripciones
- **Eliminación de historial** con confirmación
- **Sesiones persistentes** con localStorage

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS 4** - Framework de estilos utilitarios
- **React Router DOM** - Navegación del lado del cliente
- **Lucide React** - Íconos accesibles y personalizables
- **Web Speech API** - Reconocimiento de voz nativo del navegador

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express 5** - Framework web minimalista
- **MongoDB + Mongoose** - Base de datos NoSQL y ODM
- **JWT** - Autenticación basada en tokens
- **bcrypt** - Hashing seguro de contraseñas
- **Zod** - Validación de esquemas TypeScript-first
- **CORS** - Manejo de políticas de origen cruzado
- **dotenv** - Gestión de variables de entorno

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js 18+**
- **npm 8+**
- **MongoDB** (local o Atlas)
- **Navegador compatible** con Web Speech API (Chrome recomendado)

### Instalación Rápida
```bash
# Clonar el repositorio
git clone https://github.com/GabrielAlberini/transcript-app.git
cd transcript-app

# Instalar todas las dependencias
npm run install-all

# Configurar variables de entorno del backend
cd backend
cp .env.example .env
# Editar .env con tus configuraciones
```

### Variables de Entorno (Backend)
```env
PORT=1234
MONGO_URI=mongodb://localhost:27017/transcriptions-app
JWT_SECRET=tu-clave-supersecreta
```

## ▶️ Scripts Disponibles

### Desarrollo
```bash
npm run dev-backend      # Ejecuta solo el servidor backend
npm run dev-frontend     # Ejecuta solo el cliente frontend
```

### Instalación
```bash
npm run install-backend  # Instala dependencias del backend
npm run install-frontend # Instala dependencias del frontend
npm run install-all     # Instala todas las dependencias
```

### Producción
```bash
npm run build-frontend  # Construye el frontend para producción
```

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

### Transcripciones (Requieren autenticación)
- `POST /api/transcriptions` - Crear nueva transcripción
- `GET /api/transcriptions` - Obtener transcripciones del usuario
- `DELETE /api/transcriptions` - Eliminar todas las transcripciones del usuario

## 🎮 Atajos de Teclado

- **G** - Iniciar grabación
- **D** - Detener grabación
- **L** - Limpiar texto actual
- **F** - Alternar pantalla completa

## 🔒 Seguridad

- **Autenticación JWT** con expiración de 7 días
- **Hashing de contraseñas** con bcrypt (10 rounds)
- **Validación de entrada** con Zod en todas las rutas
- **Middleware de autenticación** para rutas protegidas
- **CORS configurado** para desarrollo seguro

## 📱 Compatibilidad

### Navegadores Soportados
- **Chrome/Chromium 25+** (Recomendado)
- **Edge 79+**
- **Safari 14.1+** (Funcionalidad limitada)
- **Firefox** (Sin soporte nativo de Web Speech API)

### Dispositivos
- **Desktop** - Experiencia completa
- **Tablet** - Interfaz adaptada
- **Mobile** - Funcionalidad básica

## 🎯 Casos de Uso

### Educación
- **Clases universitarias** - Transcripción en tiempo real para estudiantes
- **Conferencias académicas** - Accesibilidad para asistentes
- **Tutorías** - Registro de sesiones de apoyo

### Profesional
- **Reuniones de trabajo** - Actas automáticas
- **Entrevistas** - Registro de conversaciones
- **Presentaciones** - Subtítulos en vivo

### Personal
- **Notas de voz** - Conversión rápida a texto
- **Accesibilidad** - Apoyo para personas con discapacidad auditiva
- **Aprendizaje de idiomas** - Práctica de pronunciación

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Gabriel Alberini**
- GitHub: [@GabrielAlberini](https://github.com/GabrielAlberini)
- Email: gabialberini733@gmail.com

## 🏫 Institución

**Centro de e-Learning UTN FRBA**
- Universidad Tecnológica Nacional
- Facultad Regional Buenos Aires
- Curso: Desarrollo Web con Inteligencia Artificial

## 🙏 Agradecimientos

- **UTN FRBA** por el espacio de aprendizaje
- **Comunidad de desarrolladores** por las herramientas open source
- **Usuarios con discapacidad auditiva** por inspirar este proyecto

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] Soporte para múltiples idiomas simultáneos
- [ ] Transcripción de archivos de audio
- [ ] Salas colaborativas en tiempo real
- [ ] Integración con servicios de IA para corrección automática
- [ ] Modo offline con Service Workers
- [ ] Aplicación móvil nativa

### Mejoras Técnicas
- [ ] Tests unitarios y de integración
- [ ] CI/CD con GitHub Actions
- [ ] Dockerización del proyecto
- [ ] Monitoreo y logging avanzado
- [ ] Optimización de rendimiento
- [ ] Documentación de API con Swagger

---

> **"La accesibilidad no es un extra: es un derecho."**

*Desarrollado con ❤️ para crear un mundo más inclusivo.*