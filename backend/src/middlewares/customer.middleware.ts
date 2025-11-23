import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECERT = process.env.JWT_SECRET || "";

export function verifyRegisterToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.headers["authorization"]?.split(" ")[1] || req.body.verificationToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Verification token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECERT) as JwtPayload;

    if (!decoded.verified || !decoded.phone) {
      return res.status(401).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    // Attach phone to request object
    (req as any).verifiedPhone = decoded.phone;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Verification token expired or invalid",
    });
  }
}
