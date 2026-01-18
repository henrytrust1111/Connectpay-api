import { pool } from "../config/db";

export const startCall = async (callerId: string, receiverId: string) => {
  const result = await pool.query(
    "INSERT INTO calls (caller_id, receiver_id, started_at) VALUES ($1, $2, NOW()) RETURNING *",
    [callerId, receiverId]
  );
  return result.rows[0];
};

export const endCall = async (callId: string) => {
  const result = await pool.query(
    "UPDATE calls SET ended_at = NOW() WHERE id = $1 RETURNING *",
    [callId]
  );
  return result.rows[0];
};