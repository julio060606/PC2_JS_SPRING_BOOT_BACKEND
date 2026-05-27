-- Esquema inicial de la API PC2.
-- Uso manual: crear una base de datos PostgreSQL (por ejemplo, pc2_db),
-- conectarse a ella desde pgAdmin y ejecutar este archivo.
-- Este script no se ejecuta automaticamente desde Spring Boot.

CREATE TABLE IF NOT EXISTS productos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0)
);

CREATE TABLE IF NOT EXISTS incidencias (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    CONSTRAINT chk_incidencias_estado
        CHECK (estado IN ('PENDIENTE', 'EN_PROCESO', 'RESUELTA'))
);

CREATE TABLE IF NOT EXISTS cursos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    cupos INTEGER NOT NULL CHECK (cupos >= 0)
);

CREATE TABLE IF NOT EXISTS matriculados (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    curso_id BIGINT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    CONSTRAINT fk_matriculados_curso
        FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    CONSTRAINT uk_matriculados_curso_email
        UNIQUE (curso_id, email)
);

CREATE TABLE IF NOT EXISTS tareas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    completada BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_matriculados_curso_id
    ON matriculados(curso_id);

CREATE INDEX IF NOT EXISTS idx_incidencias_estado
    ON incidencias(estado);

CREATE INDEX IF NOT EXISTS idx_tareas_completada
    ON tareas(completada);

-- Datos de prueba opcionales. Descomentar y ejecutar una sola vez si se
-- requieren registros iniciales para probar la API.
--
-- INSERT INTO productos (nombre, precio, stock) VALUES
-- ('Laptop HP', 1500.00, 10),
-- ('Monitor LG', 300.00, 25);
--
-- INSERT INTO incidencias (titulo, descripcion, estado) VALUES
-- ('Error de acceso', 'El usuario no puede iniciar sesion.', 'PENDIENTE'),
-- ('Pantalla lenta', 'La lista tarda en cargar.', 'EN_PROCESO');
--
-- INSERT INTO cursos (nombre, descripcion, cupos) VALUES
-- ('Angular Basico', 'Introduccion a componentes y servicios.', 30),
-- ('Spring Boot API', 'Construccion de servicios REST.', 25);
--
-- INSERT INTO tareas (titulo, descripcion, completada) VALUES
-- ('Configurar backend', 'Preparar la API Spring Boot.', FALSE),
-- ('Probar endpoints', 'Validar operaciones CRUD.', FALSE);
