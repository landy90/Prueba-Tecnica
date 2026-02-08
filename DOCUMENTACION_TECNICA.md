# Documentación Técnica - Sistema de Gestión de Clientes

## Cumplimiento de Requisitos Técnicos

### 1. Lineamientos Técnicos Generales ✓

#### IDE
- **Visual Studio Code**: Recomendado para el desarrollo

#### Validaciones
- Todas las validaciones de tipos de datos implementadas
- Validaciones de extensión de caracteres según especificaciones
- Manejo de errores en todas las peticiones al API

### 2. Frontend - React JS ✓

#### React 17
- ✓ Proyecto creado con React v17
- ✓ Todos los componentes desarrollados en ECMAScript 6
- ✓ Componentes funcionales con React Hooks:
  - `useState` - Manejo de estado local
  - `useEffect` - Efectos secundarios y ciclo de vida
  - `useContext` - Consumo del contexto de autenticación

#### Context API ✓
- ✓ `AuthContext` implementado para el manejo del estado global
- ✓ Gestión de autenticación centralizada
- ✓ Persistencia de datos en localStorage

#### Axios ✓
- ✓ Todas las peticiones HTTP realizadas con Axios
- ✓ Uso de async/await para programación asíncrona
- ✓ Interceptores para manejo de tokens y errores

#### React Router DOM ✓
- ✓ Navegación implementada con React Router DOM v6
- ✓ Rutas protegidas para páginas que requieren autenticación
- ✓ Redirecciones automáticas según estado de autenticación

#### SPA (Single Page Application) ✓
- ✓ Aplicación de página única
- ✓ Navegación sin recarga de página

#### NPM Package Manager ✓
- ✓ Proyecto creado con `npx create-react-app`
- ✓ Todas las dependencias gestionadas con npm

### 3. Marco de Diseño ✓

#### Material UI ✓
- ✓ Todos los componentes basados en Material UI
- ✓ Uso de componentes predefinidos: TextField, Button, Table, Dialog, Snackbar, etc.
- ✓ Diseño siguiendo los principios de Material Design de Google

#### Responsive Design ✓
- ✓ Grid system de Material UI para diseño responsivo
- ✓ Breakpoints implementados para diferentes tamaños de pantalla
- ✓ Drawer responsivo en el Layout

#### Esquema de Colores Ejecutivo ✓
- ✓ Paleta de colores profesional con tonos azules (#1976d2)
- ✓ Contraste adecuado para legibilidad
- ✓ Estilo corporativo y limpio

### 4. Funcionalidades Implementadas ✓

#### Login ✓
- ✓ Validación de usuario y contraseña obligatorios
- ✓ Función "Recuérdame" con localStorage
- ✓ Link a página de registro
- ✓ Consumo de endpoint de autenticación
- ✓ Manejo de token JWT
- ✓ Mensajes de error apropiados

#### Registro ✓
- ✓ Todos los campos obligatorios
- ✓ Validación de email válido
- ✓ Validación de contraseña:
  - Mayor a 8 y menor o igual a 20 caracteres
  - Al menos un número
  - Al menos una mayúscula
  - Al menos una minúscula
- ✓ Consumo de endpoint de registro
- ✓ Mensajes de confirmación

#### Home ✓
- ✓ Página de entrada después del login
- ✓ Tarjeta para acceder a Gestión de Clientes
- ✓ Layout con menú y barra superior
- ✓ Nombre de usuario visible
- ✓ Botón de cerrar sesión

#### Página de Error ✓
- ✓ Componente NotFound para rutas inexistentes
- ✓ Diseño amigable con icono de error
- ✓ Botón para regresar al home

#### Consulta Clientes ✓
- ✓ Listado en tabla de clientes
- ✓ Filtros de búsqueda por identificación y nombre
- ✓ Botón de búsqueda (lupa)
- ✓ Botón de agregar nuevo cliente
- ✓ Botón de editar (lápiz)
- ✓ Botón de eliminar con confirmación
- ✓ Botón de regresar al home
- ✓ Modal de confirmación para eliminar
- ✓ Consumo correcto de endpoints
- ✓ Autorización por Bearer Token

#### Mantenimiento Clientes ✓
- ✓ Formulario completo con todos los campos
- ✓ Campos obligatorios marcados con *
- ✓ Componente de carga de imagen
- ✓ Carga de listado de intereses
- ✓ Modo creación y edición
- ✓ Validaciones de tamaño de campos
- ✓ Manejo de imagen en base64
- ✓ Radio buttons para género (M/F)
- ✓ Botón guardar
- ✓ Botón regresar
- ✓ Redirección a consulta después de guardar
- ✓ Mensajes de confirmación

### 5. Estructura de Datos

#### Cliente
```javascript
{
  nombre: string (max 50),
  apellidos: string (max 100),
  identificacion: string (max 20),
  telefonoCelular: string (max 20),
  otroTelefono: string (max 20),
  direccion: string (max 200),
  fNacimiento: date,
  fAfiliacion: date,
  sexo: "M" | "F",
  resenaPersonal: string (max 200),
  imagen: base64 string (opcional),
  interesFK: uuid
}
```

### 6. Endpoints Consumidos

Todos los endpoints especificados en el documento están implementados:

#### Autenticación
- `POST /api/Authenticate/login`
- `POST /api/Authenticate/register`

#### Clientes
- `POST /api/Cliente/Listado`
- `GET /api/Cliente/Obtener/{id}`
- `POST /api/Cliente/Crear`
- `POST /api/Cliente/Actualizar`
- `DELETE /api/Cliente/Eliminar/{id}`

#### Intereses
- `GET /api/Intereses/Listado`

### 7. Manejo de Errores ✓

- ✓ Try-catch en todas las peticiones
- ✓ Mensajes de error amigables
- ✓ Snackbar de Material UI para notificaciones
- ✓ Interceptor de Axios para errores 401

### 8. Características Adicionales

#### Seguridad
- Tokens JWT para autenticación
- Rutas protegidas
- Interceptores para validar sesión
- Logout automático en caso de token inválido

#### UX/UI
- Loading states
- Validaciones en tiempo real
- Mensajes de confirmación
- Diseño intuitivo y profesional

#### Persistencia
- localStorage para token y usuario
- Función "Recuérdame"
- Gestión automática de sesión

## Arquitectura del Proyecto

### Context API
```
AuthContext
├── Estado: user, token, loading
├── Acciones: login, logout
└── Persistencia: localStorage
```

### Componentes
```
App.js (Router principal)
├── Login (Público)
├── Register (Público)
├── NotFound (Público)
└── Protected Routes
    ├── Home
    ├── ConsultaClientes
    └── MantenimientoClientes
```

### Servicios
```
api.js
├── authService
│   ├── login
│   └── register
├── clienteService
│   ├── listado
│   ├── obtener
│   ├── crear
│   ├── actualizar
│   └── eliminar
└── interesesService
    └── listado
```

## Guía de Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación

1. Navegar al directorio del proyecto:
```bash
cd cliente-management-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

4. Abrir el navegador en:
```
http://localhost:3000
```

### Build de Producción

Para crear el build de producción:
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `build/`.

## Testing de la Aplicación

### Flujo de Usuario Completo

1. **Registro**
   - Ir a la página de registro
   - Completar el formulario con validaciones
   - Verificar mensaje de éxito
   - Redirección a login

2. **Login**
   - Ingresar credenciales
   - Marcar "Recuérdame" (opcional)
   - Verificar redirección a home

3. **Navegación**
   - Ver menú lateral con usuario
   - Acceder a "Gestión de Clientes"

4. **Consulta de Clientes**
   - Ver listado de clientes
   - Usar filtros de búsqueda
   - Probar botón de búsqueda

5. **Crear Cliente**
   - Click en "Agregar"
   - Completar formulario
   - Cargar imagen (opcional)
   - Guardar y verificar mensaje
   - Verificar redirección

6. **Editar Cliente**
   - Click en icono de editar
   - Modificar datos
   - Guardar cambios
   - Verificar actualización

7. **Eliminar Cliente**
   - Click en icono de eliminar
   - Confirmar en modal
   - Verificar mensaje de éxito

8. **Logout**
   - Click en icono de logout
   - Verificar redirección a login

## Notas Técnicas Importantes

### Imágenes
- Formato: base64
- Conversión automática desde FileReader
- Preview antes de guardar
- Campo opcional en el formulario

### Fechas
- Formato de entrada: YYYY-MM-DD
- Conversión automática para el API
- Validación de campos requeridos

### Tokens
- Almacenamiento en localStorage
- Header Authorization automático
- Renovación no implementada (fuera del scope)

### Responsividad
- Breakpoints: xs, sm, md, lg
- Grid adaptativo
- Drawer colapsable en móvil

## Conclusión

La aplicación cumple con todos los requisitos técnicos especificados en el documento:
- ✓ React 17 con componentes funcionales
- ✓ Context API para estado global
- ✓ Material UI para diseño
- ✓ Axios para consumo de API
- ✓ React Router DOM para navegación
- ✓ Todas las funcionalidades CRUD
- ✓ Validaciones completas
- ✓ Diseño responsive y ejecutivo
- ✓ Manejo de errores y mensajes de usuario
