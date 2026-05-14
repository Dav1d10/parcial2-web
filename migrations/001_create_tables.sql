-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       VARCHAR NOT NULL UNIQUE,
  password    VARCHAR NOT NULL,
  name        VARCHAR NOT NULL,
  phone       VARCHAR,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT now()
);

-- Tabla roles
CREATE TABLE IF NOT EXISTS roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_name   VARCHAR NOT NULL UNIQUE,
  description VARCHAR,
  created_at  TIMESTAMP DEFAULT now()
);

-- Tabla intermedia user_roles (relación ManyToMany)
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);