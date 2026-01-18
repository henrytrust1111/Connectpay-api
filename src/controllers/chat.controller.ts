import { Request, Response } from "express";
import { getChatHistory } from "../services/message.service";

export const getHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const messages = await getChatHistory(req.user!.id, userId as string);
  res.json(messages);
};