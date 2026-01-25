import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const fetchAllUsers = async (req: Request, res: Response) => {
    const currentUserId = req.user.id
  const users = await getAllUsers(currentUserId);
  res.json(users);
};
