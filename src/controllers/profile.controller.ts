import { Request, Response } from "express";
import { findUserById, updateUser } from "../services/user.service";

export const getProfile = async (req: Request, res: Response) => {
  const user = await findUserById(req.user!.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, phone, avatar } = req.body;
  const user = await updateUser(req.user!.id, { name, phone, avatar });
  res.json(user);
};