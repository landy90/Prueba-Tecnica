# Sistema de Gestión de Clientes

Aplicación de gestión de clientes desarrollada en React 17 con autenticación JWT, CRUD completo, búsqueda filtrada y carga de imágenes. Incluye Material-UI, Context API, React Router v6 y Axios para integración con API REST.

## Características

- ✓ Autenticación: Login y registro de usuarios con validación de contraseña
- ✓ Gestión de Clientes: CRUD completo (crear, consultar, editar, eliminar)
- ✓ Búsqueda Filtrada: Filtrar clientes por identificación y nombre
- ✓ Perfil de Usuario: Carga de imagen de perfil en base64
- ✓ Intereses: Gestión de intereses personalizados por cliente
- ✓ Sesión Persistente: Recuérdame y almacenamiento en localStorage
- ✓ Diseño Responsivo: Interfaz adaptable a cualquier dispositivo
- ✓ Validaciones: Validación de datos en tiempo real

## Requisitos

- Node.js v14 o superior
- npm v6 o superior

## Instalación

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## Build para Producción

```bash
npm run build
```

## Tecnologías Utilizadas

- **React 17** - Framework principal
- **Material-UI** - Componentes de diseño
- **React Router DOM v6** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado
- **JWT** - Autenticación segura

## Estructura del Proyecto

```
src/
├── components/
│   ├── Login.js
│   ├── Register.js
│   ├── Home.js
│   ├── ConsultaClientes.js
│   ├── MantenimientoClientes.js
│   └── Layout.js
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
├── App.js
└── index.js
```

## Notas

- El endpoint DELETE para eliminar clientes está documentado en el Swagger del API, pero actualmente requiere configuración adicional en el servidor.
- La aplicación consume una API REST externa (configurada en `services/api.js`).

## Licencia

Este proyecto es privado y de uso interno.
