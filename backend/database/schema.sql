CREATE DATABASE IF NOT EXISTS ridenow;
USE ridenow;

CREATE TABLE usuarios (
  id         VARCHAR(20) PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  dni        VARCHAR(8) NOT NULL UNIQUE,
  email      VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  telefono   VARCHAR(20),
  direccion  VARCHAR(255),
  rol        ENUM("pasajero","conductor","admin") DEFAULT "pasajero",
  creado_en  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conductores (
  id            VARCHAR(20) PRIMARY KEY,       
  usuario_id    VARCHAR(20) NOT NULL UNIQUE,
  licencia      VARCHAR(50) NOT NULL UNIQUE,
  vehiculo      VARCHAR(100) NOT NULL,
  placa         VARCHAR(20) NOT NULL UNIQUE,
  calificacion  DECIMAL(3,2) DEFAULT 5.00,
  activo        BOOLEAN DEFAULT TRUE,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE viajes (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  pasajero_id  VARCHAR(20) NOT NULL,
  conductor_id VARCHAR(20),
  origen       VARCHAR(255) NOT NULL,
  destino      VARCHAR(255) NOT NULL,
  estado       ENUM("pendiente","en_curso","completado","cancelado") DEFAULT "pendiente",
  precio       DECIMAL(10,2),
  creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pasajero_id)  REFERENCES usuarios(id),
  FOREIGN KEY (conductor_id) REFERENCES conductores(id)
);

CREATE TABLE pagos (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  viaje_id  INT NOT NULL,
  monto     DECIMAL(10,2) NOT NULL,
  metodo    VARCHAR(50) NOT NULL,
  estado    ENUM("pendiente","completado","fallido") DEFAULT "pendiente",
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (viaje_id) REFERENCES viajes(id)
);