import { pool } from "../config/db";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
}

/**
 * Save a new chat message
 */
export const saveMessage = async ({
  senderId,
  receiverId,
  message
}: MessagePayload) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, message)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [senderId, receiverId, message]
  );

  return result.rows[0];
};

/**
 * Fetch chat history between two users
 */
export const getChatHistory = async (
  userId: string,
  otherUserId: string
) => {
  const result = await pool.query(
    `SELECT *
     FROM messages
     WHERE
       (sender_id = $1 AND receiver_id = $2)
       OR
       (sender_id = $2 AND receiver_id = $1)
     ORDER BY created_at ASC`,
    [userId, otherUserId]
  );

  return result.rows;
};
