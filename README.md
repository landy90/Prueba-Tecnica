# Prueba-Tecnica
Aplicación de gestión de clientes desarrollada en React 17 con autenticación JWT, CRUD completo, búsqueda filtrada y carga de imágenes. Incluye Material-UI, Context API, React Router v6 y Axios para integración con API REST. 

# Sistema de Gestión de Clientes

Aplicación React JS desarrollada para la gestión de clientes según los requerimientos técnicos de Innovasoft S.A.

## Características

- **React JS v17** con componentes funcionales y React Hooks
- **Material UI** para el diseño de la interfaz
- **React Router DOM** para la navegación
- **Context API** para el manejo del estado
- **Axios** para el consumo de servicios REST
- Diseño responsive y ejecutivo

## Funcionalidades

### Autenticación
- Login con validación de credenciales
- Registro de usuarios con validaciones de email y contraseña
- Función "Recuérdame" para guardar el usuario
- Gestión de tokens JWT

### Gestión de Clientes
- Listado de clientes con filtros de búsqueda
- Crear nuevos clientes
- Editar clientes existentes
- Eliminar clientes (con confirmación)
- Carga de imagen de perfil (opcional)
- Validaciones de campos obligatorios

### Características Técnicas
- Single Page Application (SPA)
- Componentes funcionales con ES6
- React Hooks (useState, useEffect, useContext)
- Context API para autenticación
- Manejo de promesas y async/await
- Validaciones de formularios
- Mensajes de retroalimentación (Snackbar)
- Rutas protegidas
- Página de error 404

## Instalación

1. Clonar el repositorio o extraer los archivos

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
cliente-management-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Home.js
│   │   ├── Layout.js
│   │   ├── ConsultaClientes.js
│   │   ├── MantenimientoClientes.js
│   │   ├── NotFound.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## API Endpoints

La aplicación consume los siguientes endpoints del API:

**Base URL:** `https://pruebareactjs.test-class.com/Api/`

- `POST /api/Authenticate/login` - Iniciar sesión
- `POST /api/Authenticate/register` - Registrar usuario
- `POST /api/Cliente/Listado` - Listar clientes
- `GET /api/Cliente/Obtener/{id}` - Obtener cliente
- `POST /api/Cliente/Crear` - Crear cliente
- `POST /api/Cliente/Actualizar` - Actualizar cliente
- `DELETE /api/Cliente/Eliminar/{id}` - Eliminar cliente
- `GET /api/Intereses/Listado` - Listar intereses

## Componentes Principales

### AuthContext
Maneja la autenticación del usuario usando Context API:
- Estado de sesión
- Token JWT
- Funciones de login/logout
- Persistencia en localStorage

### Login
- Validación de credenciales
- Función "Recuérdame"
- Redirección a registro

### Register
- Validaciones de email
- Validaciones de contraseña (8-20 caracteres, mayúsculas, minúsculas, números)
- Confirmación de contraseña

### ConsultaClientes
- Tabla de clientes
- Filtros de búsqueda
- Acciones de editar y eliminar
- Confirmación de eliminación

### MantenimientoClientes
- Formulario para crear/editar clientes
- Carga de imagen (base64)
- Validaciones de campos
- Selección de intereses

### Layout
- Barra de navegación superior
- Menú lateral
- Información del usuario
- Botón de cerrar sesión

## Validaciones Implementadas

### Registro
- Email válido
- Contraseña > 8 y ≤ 20 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Confirmación de contraseña

### Clientes
- Todos los campos obligatorios (excepto imagen)
- Límites de caracteres por campo
- Formato de fechas
- Selección de género
- Selección de intereses

## Tecnologías Utilizadas

- React 17.0.2
- Material UI 5.11.12
- React Router DOM 6.8.2
- Axios 1.3.4
- React Context API

## Notas de Implementación

- Se utilizan componentes funcionales con React Hooks según los requerimientos
- El diseño sigue los principios de Material Design
- La aplicación es completamente responsive
- Se implementó un esquema de colores ejecutivo con tonos azules
- Todas las operaciones CRUD muestran mensajes de confirmación
- Las imágenes se manejan en formato base64
- Se implementaron rutas protegidas que requieren autenticación

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Crea el build de producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack

## Autor

Desarrollado según especificaciones técnicas de Innovasoft S.A.

## Licencia

Derechos Reservados © Innovasoft S.A. | 2022
