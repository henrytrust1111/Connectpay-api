CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  balance NUMERIC DEFAULT 0
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID,
  receiver_id UUID,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID,
  receiver_id UUID,
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);
