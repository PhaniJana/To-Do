import type { Request, Response, NextFunction } from "express";
import e from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../config/models.js";

interface AuthPayload extends JwtPayload {
  id: string;
}
export interface AuthRequest extends Request {
  user?: IUser | null;
}
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required." });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, getJwtSecret()) as AuthPayload;
    req.user = await User.findById(payload.id).select("-password");
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};
