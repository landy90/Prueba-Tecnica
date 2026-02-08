# Guía Rápida de Instalación

## Paso 1: Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)

Verifica las versiones instaladas:
```bash
node --version
npm --version
```

## Paso 2: Instalación del Proyecto

1. Abre una terminal en el directorio del proyecto:
```bash
cd cliente-management-app
```

2. Instala todas las dependencias:
```bash
npm install
```

Este comando instalará:
- React 17
- Material UI
- React Router DOM
- Axios
- Y todas las demás dependencias necesarias

## Paso 3: Iniciar la Aplicación

Ejecuta el siguiente comando:
```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en:
```
http://localhost:3000
```

## Paso 4: Uso de la Aplicación

### Primera vez - Registro de Usuario

1. Haz clic en "¿No tiene una cuenta? Regístrese"
2. Completa el formulario:
   - Usuario
   - Email (formato válido)
   - Contraseña (más de 8 caracteres, con mayúsculas, minúsculas y números)
   - Confirmar contraseña
3. Haz clic en "Registrarse"

### Iniciar Sesión

1. Ingresa tu usuario y contraseña
2. Opcionalmente marca "Recuérdame"
3. Haz clic en "Iniciar Sesión"

### Gestionar Clientes

Una vez dentro:
1. Haz clic en la tarjeta "Gestión de Clientes"
2. Usa el botón "Agregar" para crear un nuevo cliente
3. Completa el formulario con todos los datos requeridos
4. Opcionalmente carga una imagen
5. Haz clic en "Guardar"

## Solución de Problemas Comunes

### Error: "npm command not found"
- Instala Node.js desde https://nodejs.org/

### Error en la instalación de dependencias
```bash
npm cache clean --force
npm install
```

### Puerto 3000 en uso
```bash
# En Windows
netstat -ano | findstr :3000
taskkill /PID [número_de_proceso] /F

# En Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### La aplicación no se abre automáticamente
- Abre manualmente: http://localhost:3000

## Comandos Útiles

- **Iniciar en modo desarrollo**: `npm start`
- **Crear build de producción**: `npm run build`
- **Ejecutar tests**: `npm test`

## Estructura de Archivos Importante

```
cliente-management-app/
├── src/
│   ├── components/      # Componentes React
│   ├── context/         # Context API
│   ├── services/        # Servicios API
│   ├── App.js          # Componente principal
│   └── index.js        # Punto de entrada
├── public/
│   └── index.html      # HTML base
└── package.json        # Dependencias
```

## API

La aplicación se conecta automáticamente a:
```
https://pruebareactjs.test-class.com/Api/
```

No necesitas configurar nada adicional para la conexión al API.

## Soporte

Si encuentras algún problema:
1. Verifica que todas las dependencias estén instaladas
2. Asegúrate de tener la versión correcta de Node.js
3. Revisa la consola del navegador para errores
4. Verifica la conexión a internet (necesaria para el API)

## Características Principales

✓ Login y Registro de usuarios
✓ Gestión completa de clientes (CRUD)
✓ Carga de imágenes
✓ Validaciones de formularios
✓ Diseño responsive
✓ Material Design

¡Listo! Ya puedes empezar a usar la aplicación.
