import { pool } from "../config/db";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
  replyToMessageId?: string | null;
}

/**
 * Save a new chat message
 */
export const saveMessage = async ({
  senderId,
  receiverId,
  message,
  replyToMessageId = null,
}: MessagePayload) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, message, reply_to_message_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [senderId, receiverId, message, replyToMessageId || null],
  );

  return result.rows[0];
};

/**
 * Fetch chat history between two users
 */
export const getChatHistory = async (userId: string, otherUserId: string) => {
  const result = await pool.query(
    `
    SELECT
      m.id,
      m.sender_id,
      m.receiver_id,
      m.message,
      m.created_at,

      -- quoted message fields (if any)
      rm.id AS reply_id,
      rm.message AS reply_message,
      rm.sender_id AS reply_sender_id

    FROM messages m

    -- self join to get the quoted message
    LEFT JOIN messages rm
      ON m.reply_to_message_id = rm.id

    WHERE
      (m.sender_id = $1 AND m.receiver_id = $2)
      OR
      (m.sender_id = $2 AND m.receiver_id = $1)

    ORDER BY m.created_at ASC
    `,
    [userId, otherUserId],
  );

  return result.rows;
};
