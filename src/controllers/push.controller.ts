import { Request, Response } from "express";
import { saveSubscription } from "../services/push.service";

export const subscribeToPush = async (req: Request, res: Response) => {
  const { subscription } = req.body;
  const userId = req.user.id; // from auth middleware

  await saveSubscription(userId, subscription);

  res.json({ success: true });
};
