# Proyecto PC2 - Frontend Angular Y Backend Spring Boot

Desarrolladores:
- Leonardo Gonzales Delgado
- Kevin Briceño Zegarra
- Julio Minaya Urdanivia
- Andy Calagua Medina 

Actividad: Aplicacion fullstack para la PC2 de JavaScript Avanzado con cuatro modulos:

- Cafeteria: consultar productos y registrar pedidos que descuentan stock.
- Laboratorio: registrar incidencias y actualizar su estado de atencion.
- Matricula: consultar cursos y solicitar matriculas que descuentan vacantes.
- Tareas: administrar entregas con estado, fecha y prioridad.

## Estructura

```text
PC2_JS_AVANZADO/
|-- backend/     API REST Spring Boot + PostgreSQL
|-- frontend/    SPA Angular
`-- README.md
```

## Desarrollo Local

### Backend

El backend usa variables de entorno para PostgreSQL. Para IntelliJ o ejecucion
local, crear `backend/env/local.env` tomando como referencia
`backend/env/local.env.example`. Este archivo esta excluido de Git.

Desde `backend/`:

```powershell
.\scripts\mvn-local.cmd spring-boot:run
```

La API queda disponible en `http://localhost:8080/api`.

### Frontend

El frontend usa exclusivamente `pnpm` y conserva `pnpm-lock.yaml`.

Desde `frontend/`:

```powershell
pnpm install
pnpm start
```

La SPA queda disponible en `http://localhost:4200`.

## Base De Datos

El esquema PostgreSQL recrea las tablas academicas y carga datos de demostracion:

```text
backend/database/001_schema_inicial.sql
```

Para preparar la base de demostracion, ejecutar manualmente ese script en
pgAdmin. El script elimina las tablas anteriores, por lo que debe usarse en
una base destinada a esta demostracion.

## Endpoints Principales

```text
GET  /api/productos
GET  /api/productos/{id}
POST /api/pedidos
GET  /api/incidencias
POST /api/incidencias
PUT  /api/incidencias/{id}/estado
GET  /api/cursos
GET  /api/cursos/{id}
POST /api/matriculas
GET  /api/tareas
POST /api/tareas
PUT  /api/tareas/{id}
DELETE /api/tareas/{id}
```
## Enlaces De Produccion

```text
Frontend (Vercel): https://pc2-frontend.vercel.app
Backend (Render):  https://pc2-backend-kbf8.onrender.com
```

## Pasos para ejecutar nuestra aplicación:

1. Abrir `https://pc2-backend-kbf8.onrender.com` minutos antes para
   despertar el servicio gratuito, hasta que salga el mensaje de Spring Boot confirmando
   que encendió.
2. Abrir el frontend Vercel y recorrer los cuatro modulos.
3. Probar una operacion representativa en cada modulo. Listo!
