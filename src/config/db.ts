import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT 1");

    // Ensure messages table has columns used by the application (safe to run repeatedly)
    await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS edited BOOLEAN DEFAULT false`);
    await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS edited_at TIMESTAMP`);

    // Ensure delete-related columns exist
    await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false`);
    await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS deleted_for UUID[] DEFAULT '{}'`);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};


// import { Pool } from "pg";
// import { env } from "./env";

// export const pool = new Pool({
//   connectionString: env.DATABASE_URL
// });

// export const connectDB = async () => {
//   try {
//     await pool.query("SELECT 1");
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     process.exit(1);
//   }
// };
