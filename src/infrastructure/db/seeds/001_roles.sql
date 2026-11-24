-- Базовые роли.
-- ON CONFLICT (name) DO NOTHING -> скрипт идемпотентный, можно запускать много раз.
-- Запуск: psql -h localhost -p 5432 -U postgres -d postgres -f src/infrastructure/db/seeds/001_roles.sql

INSERT INTO roles (name, description) VALUES
  ('user',  'Обычный пользователь'),
  ('admin', 'Администратор')
ON CONFLICT (name) DO NOTHING;
