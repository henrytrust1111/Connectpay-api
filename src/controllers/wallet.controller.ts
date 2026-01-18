import { Request, Response } from "express";
import { createWallet, getWalletBalance } from "../services/wallet.service";

export const create = async (req: Request, res: Response) => {
  const wallet = await createWallet(req.user!.id);
  res.json(wallet);
};

export const getBalance = async (req: Request, res: Response) => {
  const balance = await getWalletBalance(req.user!.id);
  res.json(balance);
};