-- Insertar roles base
INSERT INTO roles (role_name, description)
VALUES 
  ('admin', 'Administrador del sistema'),
  ('doctor', 'Doctor del sistema')
ON CONFLICT (role_name) DO NOTHING;

-- Insertar usuario admin de prueba
-- password: Admin123! (hasheada con bcrypt)
INSERT INTO users (email, password, name, phone, is_active)
VALUES (
  'admin@test.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'Admin Test',
  '3001234567',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario normal de prueba
INSERT INTO users (email, password, name, is_active)
VALUES (
  'doctor@test.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'Doctor Test',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Asignar rol admin al primer usuario
INSERT INTO user_roles (user_id, role_id)
VALUES (
  (SELECT id FROM users WHERE email = 'admin@test.com'),
  (SELECT id FROM roles WHERE role_name = 'admin')
)
ON CONFLICT DO NOTHING;

-- Asignar rol doctor al segundo usuario
INSERT INTO user_roles (user_id, role_id)
VALUES (
  (SELECT id FROM users WHERE email = 'doctor@test.com'),
  (SELECT id FROM roles WHERE role_name = 'doctor')
)
ON CONFLICT DO NOTHING;