CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  balance NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID,
  receiver_id UUID,
  message TEXT,
  reply_to_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT false,
  deleted_for UUID[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID,
  receiver_id UUID,
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


-- Keep schema robust: add columns if they are missing
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS edited BOOLEAN DEFAULT false;

ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS edited_at TIMESTAMP;

-- Ensure delete-related columns are also present
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;

ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS deleted_for UUID[] DEFAULT '{}';

-- If you need to add reply_to_message_id later, consider running:
-- ALTER TABLE messages
--   ADD COLUMN IF NOT EXISTS reply_to_message_id UUID REFERENCES messages(id) ON DELETE SET NULL;
