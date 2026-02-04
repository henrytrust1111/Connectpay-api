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
 * Find a message by id
 */
export const findMessageById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM messages WHERE id = $1`, [id]);
  return result.rows[0];
};

/**
 * Edit a message (only sender can edit)
 */
export const editMessage = async (id: string, editorId: string, newMessage: string) => {
  // Ensure the editor is the original sender
  const existing = await findMessageById(id);
  if (!existing) throw new Error("Message not found");
  if (existing.sender_id !== editorId) throw new Error("Unauthorized: only the sender can edit this message");

  const result = await pool.query(
    `UPDATE messages
     SET message = $3, edited = true, edited_at = NOW()
     WHERE id = $1
       AND sender_id = $2
     RETURNING *`,
    [id, editorId, newMessage],
  );

  return result.rows[0];
};

/**
 * Delete a message for everyone (only sender can do this)
 */
export const deleteMessageForEveryone = async (id: string, requesterId: string) => {
  const existing = await findMessageById(id);
  if (!existing) throw new Error("Message not found");
  if (existing.sender_id !== requesterId) throw new Error("Unauthorized: only the sender can delete for everyone");

  const result = await pool.query(
    `UPDATE messages
     SET is_deleted = true, message = NULL
     WHERE id = $1
       AND sender_id = $2
     RETURNING *`,
    [id, requesterId],
  );

  return result.rows[0];
};

/**
 * Delete a message for the requesting user only
 */
export const deleteMessageForMe = async (id: string, userId: string) => {
  const result = await pool.query(
    `UPDATE messages
     SET deleted_for = CASE WHEN $2 = ANY(deleted_for) THEN deleted_for ELSE array_append(coalesce(deleted_for, '{}')::uuid[], $2::uuid) END
     WHERE id = $1
     RETURNING *`,
    [id, userId],
  );

  return result.rows[0];
};

/**
 * Fetch chat history between two users (excludes messages deleted for the requesting user)
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
      m.edited,
      m.edited_at,
      m.is_deleted,
      m.deleted_for,

      -- quoted message fields (if any)
      rm.id AS reply_id,
      rm.message AS reply_message,
      rm.sender_id AS reply_sender_id

    FROM messages m

    -- self join to get the quoted message
    LEFT JOIN messages rm
      ON m.reply_to_message_id = rm.id

    WHERE
      ((m.sender_id = $1 AND m.receiver_id = $2)
      OR
      (m.sender_id = $2 AND m.receiver_id = $1))
      AND NOT ($1 = ANY(coalesce(m.deleted_for, '{}')))

    ORDER BY m.created_at ASC
    `,
    [userId, otherUserId],
  );

  return result.rows;
};
