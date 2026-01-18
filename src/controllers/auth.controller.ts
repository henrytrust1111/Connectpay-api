import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.service";
import { createWallet } from "../services/wallet.service";
import { env } from "../config/env";

export const signup = async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await createUser({ ...req.body, password: hashed });
  await createWallet(user.id);
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
  res.json({ token, user });
};

export const login = async (req: Request, res: Response) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
  res.json({ token });
};
