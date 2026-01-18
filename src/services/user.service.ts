import { pool } from "../config/db";

export const createUser = async (data: any) => {
  const { name, email, phone, password } = data;
  const result = await pool.query(
    `INSERT INTO users(name,email,phone,password)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, phone, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};

export const findUserById = async (id: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [id]
  );
  return result.rows[0];
};

export const updateUser = async (id: string, data: any) => {
  const { name, phone, avatar } = data;
  const result = await pool.query(
    `UPDATE users SET name=$1, phone=$2, avatar=$3 WHERE id=$4 RETURNING *`,
    [name, phone, avatar, id]
  );
  return result.rows[0];
};
