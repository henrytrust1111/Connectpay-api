import { startCall, endCall } from "../services/call.service";
import { Request, Response } from "express";

export const start = async (req: Request, res: Response) => {
  const call = await startCall(req.user.id, req.body.receiverId);
  res.json(call);
};

export const end = async (req: Request, res: Response) => {
  const call = await endCall(req.body.callId);
  res.json(call);
};
