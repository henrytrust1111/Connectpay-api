import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as "1h",
  ONEPIPE_API_KEY: process.env.ONEPIPE_API_KEY || "mock_key",
  NODE_ENV: process.env.NODE_ENV
};
 