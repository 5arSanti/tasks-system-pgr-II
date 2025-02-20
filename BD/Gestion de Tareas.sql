CREATE DATABASE gestion_tareas;
USE gestion_tareas;

-- Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre ENUM('Profesor', 'Estudiante') NOT NULL
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Tabla de Asignaturas
CREATE TABLE asignaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Tareas
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_entrega DATETIME NOT NULL,
    asignatura_id INT,
    usuario_id BIGINT, 
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de Estados de Tareas
CREATE TABLE estados_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    usuario_id BIGINT,
    estado ENUM('pendiente', 'en_progreso', 'completada') NOT NULL DEFAULT 'pendiente',
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Insertar Roles
INSERT INTO roles (nombre) VALUES
('Profesor'),
('Estudiante');

-- Insertar Usuarios
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'contrasena123', 1), 
('Ana', 'Gómez', 'ana.gomez@example.com', 'contrasena456', 2);   

-- Insertar Asignaturas
INSERT INTO asignaturas (nombre) VALUES
('Matemáticas'),
('Historia');

-- Insertar Tareas
INSERT INTO tareas (titulo, descripcion, fecha_entrega, asignatura_id, usuario_id) VALUES
('Tarea 1 de Matemáticas', 'Resolver los ejercicios de la página 50.', '2023-12-01 23:59:59', 1, 1),
('Tarea 1 de Historia', 'Leer el capítulo 3 y resumirlo.', '2023-12-05 23:59:59', 2, 1);          

-- Insertar Estados de Tareas
INSERT INTO estados_tareas (tarea_id, usuario_id, estado) VALUES
(1, 2, 'pendiente'), 
(2, 2, 'en_progreso');
