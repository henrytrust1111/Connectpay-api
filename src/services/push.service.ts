import webpush from "web-push";
import { pool } from "../config/db";
import { env } from "../config/env";

webpush.setVapidDetails(
  "mailto:henrytrust1111@gmail.com",
  env.VAPID_PUBLIC_KEY!,
  env.VAPID_PRIVATE_KEY!,
);

export const saveSubscription = async (userId: string, subscription: any) => {
  await pool.query(
    `INSERT INTO push_subscriptions (user_id, subscription)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, subscription],
  );
};

export const sendPushNotification = async (userId: string, payload: any) => {
  const result = await pool.query(
    `SELECT subscription FROM push_subscriptions WHERE user_id = $1`,
    [userId],
  );

  for (const row of result.rows) {
    try {
      await webpush.sendNotification(row.subscription, JSON.stringify(payload));
    } catch (err) {
      console.error("Push failed:", err);
    }
  }
};
