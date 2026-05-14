
CREATE TYPE appointment_status AS ENUM ('pending', 'cancelled', 'done');


CREATE TABLE IF NOT EXISTS appointments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  datetime    TIMESTAMP NOT NULL DEFAULT now(),
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  motive      VARCHAR NOT NULL,
  status      appointment_status NOT NULL DEFAULT 'pending',
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE
);
