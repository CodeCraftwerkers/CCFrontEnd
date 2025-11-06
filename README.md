# Code Crafters – Frontend

## 🎯 Objetivo

**Code Crafters Frontend** es una aplicación SPA desarrollada con **React 19 + Vite 7 + Tailwind CSS 4**, que ofrece una interfaz moderna, rápida y responsive para conectar a la comunidad tecnológica mediante eventos online y presenciales.  
Consume la API desarrollada en **Spring Boot + PostgreSQL**, gestionando la autenticación, los perfiles de usuario y la interacción con los eventos.

<img width="1897" height="904" alt="2" src="https://github.com/user-attachments/assets/08d6577b-006b-4d97-a9a2-8936d882711b" />


---

## ⚙️ Tecnologías y Herramientas

| Categoría | Tecnologías |
|------------|-------------|
| **Framework** | React 19 + Vite 7 |
| **Estilos** | Tailwind CSS 4 + PostCSS + Autoprefixer |
| **Routing** | React Router DOM 7 |
| **Gestión de Estado / Data Fetching** | TanStack React Query 5 |
| **Formularios y Validación** | React Hook Form + Zod |
| **Comunicación API** | Axios + JWT Auth |
| **Componentes e Iconos** | Lucide React + React Icons |
| **Notificaciones** | React Hot Toast |
| **Testing** | Vitest + Testing Library (React / Jest-DOM / jsdom) |
| **Linting y Formato** | ESLint + Prettier |
| **Diseño / Prototipado** | Figma |
| **Control de Versiones** | Git + GitHub |
| **Gestión del Proyecto** | Trello |

### 🧩 Desglose técnico

**Frontend Core:** React 19 y Vite 7 como base para una SPA rápida y modular.  
**Estilos:** Tailwind CSS 4 con PostCSS y Autoprefixer para un diseño responsive y limpio.  
**Routing:** React Router DOM 7 para la navegación entre páginas (Home, Events, Profile…).  
**Data y Formularios:** TanStack React Query + React Hook Form + Zod para validaciones y gestión eficiente del estado.  
**Comunicación API:** Axios centralizado en `src/services/`, autenticado con JWT.  
**UI y UX:** Lucide React / React Icons / React Hot Toast.  
**Testing:** Vitest + Testing Library.  
**Diseño y Gestión:** Prototipado en Figma y planificación de tareas en Trello bajo metodología ágil.

---

## ✨ Funcionalidades

### 🔓 Público
- Página de inicio con presentación de la plataforma.  
- Listado de eventos con filtros por categoría, tipo y fecha.  
- Vista de detalle de evento con información completa.  


### 🔐 Autenticación y cuentas
- Registro e inicio de sesión con validaciones.  
- Persistencia del token JWT en localStorage.  
- Cierre de sesión seguro.  


### 👤 Perfil de usuario
- Visualización y edición de datos personales.  
- Conteo de eventos creados y apuntados.  
- Integración directa con el backend mediante `ApiUser`.  


### 🗓️ Gestión de eventos
- Creación, edición y eliminación de eventos propios.  
- Inscripción y desinscripción en eventos.  
- Prevención de duplicados y control de aforo.  


### 📱 Responsive Design
- Diseño adaptativo para móvil, tablet y escritorio.  
<img width="375" height="794" alt="image" src="https://github.com/user-attachments/assets/a545cf91-1722-49b6-9b43-b1aae24dabb3" />

---

## 🧭 Arquitectura del Proyecto


El frontend se comunica con el backend a través de servicios API (`ApiUser.jsx`, `ApiEvent.jsx`, `ApiRegistration.jsx`) usando JWT para autenticar las peticiones.


## 🧩 Estructura del Proyecto

```bash
CCFRONTEND
├── public/
│   └── index.html
├── src/
│   ├── application/
│   │   └── Router.jsx
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── home/
│   │   ├── Footer.jsx
│   │   ├── LoginForm.jsx
│   │   ├── NavBar.jsx
│   │   ├── RegisterForm.jsx
│   │   └── UserToast.jsx
│   ├── data/
│   ├── pages/
│   │   ├── Homepage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── EventDetailsPage.jsx
│   │   ├── EditEventPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── UsersPage.jsx
│   ├── services/
│   │   ├── ApiEvent.jsx
│   │   ├── ApiRegistration.jsx
│   │   └── ApiUser.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── package.json
└── README.md



---

## 🚀 Ejecución del Proyecto

### 🧱 Requisitos previos
- Node.js ≥ 18  
- npm instalado  
- Backend Code Crafters corriendo en `http://localhost:8080`

### ▶️ Pasos para iniciar el frontend
```bash
# 1. Clonar el repositorio
git clone https://github.com/CodeCraftwerkers/CCFrontEnd.git

# 2. Entrar en el directorio
cd CCFrontEnd

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev


## 👩‍💻 Contactos

¿Tienes dudas o quieres saber más sobre el proyecto?  
Puedes contactar a las desarrolladoras a través de sus perfiles profesionales:

| Nombre | Rol | LinkedIn | GitHub |
|--------|------|-----------|--------|
| **Suraya Mattar** | PO / Developer | [LinkedIn](https://www.linkedin.com/in/suraya-mattar/) | [GitHub](https://github.com/surayac) |
| **Daniella Pacheco** | SM / Developer | [LinkedIn](https://www.linkedin.com/in/daniellapacheco/) | [GitHub](https://github.com/DaniPacheco8) |
| **Ángela Bello** | Developer | [LinkedIn](https://www.linkedin.com/in/angela-bello-developer/) | [GitHub](https://github.com/AngelaBello-creator) |
| **Erika Montoya** | Developer | [LinkedIn](https://www.linkedin.com/in/erikamontoya/) | [GitHub](https://github.com/DevErika) |
| **Estefanía Secanell** | Developer | [LinkedIn](https://www.linkedin.com/in/stef-secanell/) | [GitHub](https://github.com/Abaraira) |
| **Luisa Moreno** | Developer | [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/LuMorenoM) |
