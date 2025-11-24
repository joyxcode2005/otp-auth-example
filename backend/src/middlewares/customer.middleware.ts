import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECERT = process.env.JWT_SECRET || "";

// Middleware to verify the token and extract the phone number
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

export function customerAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract the token from cookie
    const authToken = req.cookies.customer_token;

    if (!authToken)
      return res.status(401).json({
        success: false,
        message: "Unauthorized! No token found.",
      });

    // Verify the token
    const decoded = jwt.verify(authToken, JWT_SECERT);

    // Attach the decoded data to the request
    (req as any).customer = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
}
