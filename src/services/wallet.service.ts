import { pool } from "../config/db";

export const createWallet = async (userId: string) => {
  const result = await pool.query(
    "INSERT INTO wallets(user_id,balance) VALUES($1,$2) RETURNING *",
    [userId, 0]
  );
  return result.rows[0];
};

export const getWalletBalance = async (userId: string) => {
  // Mock OnePipe API call
  // In real implementation, call OnePipe API
  const wallet = await pool.query(
    "SELECT * FROM wallets WHERE user_id = $1",
    [userId]
  );
  if (!wallet.rows[0]) {
    throw new Error("Wallet not found");
  }
  // Mock balance update or just return DB balance
  return { balance: wallet.rows[0].balance };
};

export const getBalance = async (userId: string) => {
  const result = await pool.query(
    "SELECT balance FROM wallets WHERE user_id=$1",
    [userId]
  );
  return result.rows[0] || { balance: 0 };
};
