import { Request, Response } from "express";
import {
  getChatHistory,
  editMessage as editMessageService,
  deleteMessageForEveryone,
  deleteMessageForMe,
} from "../services/message.service";

export const getHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const messages = await getChatHistory(req.user!.id, userId as string);
  res.json(messages);
};

export const editMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updated = await editMessageService(String(id), String(req.user!.id), String(message));
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const type = (req.query.type as string) || "me";
    if (type === "everyone") {
      const updated = await deleteMessageForEveryone(String(id), String(req.user!.id));
      return res.json({ id, forEveryone: true, message: updated });
    }

    const updated = await deleteMessageForMe(String(id), String(req.user!.id));
    res.json({ id, forEveryone: false, deletedFor: String(req.user!.id), message: updated });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};