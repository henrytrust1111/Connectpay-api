import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // or define a proper User type
    }
  }
}