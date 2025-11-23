import { Router, Request, Response } from "express";
import { normalizePhone } from "../utils/normalizePhone";
import { sendOtp, verifyOtp } from "../services/otp.service";
import { customerRegisterSchema } from "../schemas/customer.schema";
import {
  checkExistingCustomer,
  createCustomer,
} from "../controllers/customer.controller";
import jwt from "jsonwebtoken";
import { verifyRegisterToken } from "../middlewares/customer.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();

// Route to send generate the otp and send it to the user
router.post("/register/init", async (req: Request, res: Response) => {
  // Take the phone number as input from the customer
  let phoneNumber = req.body.phoneNumber?.toString().trim();

  try {
    // Normalize the phone number in the correct format
    const phone = normalizePhone(phoneNumber);

    // If incorrect phone number format then return status code
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Send the otp back to the user
    const { otp } = await sendOtp(phone);

    if (otp)
      return res.status(200).json({
        success: true,
        message: "OTP generated!!",
        phone,
        otp,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!!",
    });
  }
});

// Route to accept the otp and verify it
router.post("/register/verify", async (req: Request, res: Response) => {
  // Get the phone number and otp from the body
  let phoneNumber = req.body.phoneNumber?.toString().trim();
  const { otp } = req.body;

  // Check if phone number and otp exists
  if (!phoneNumber || !otp)
    return res.status(400).json({
      success: false,
      message: "Invalid Input!!",
    });

  try {
    // Normalize the otp
    const phone = normalizePhone(phoneNumber);

    // If incorrect phone number format then return status code
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Verify the otp
    const { success, message } = await verifyOtp(phone, otp);

    // Send response accordingly
    if (!success)
      return res.status(400).json({
        success,
        message,
      });

    // Create JWT containing verified phone number
    const verificationToken = jwt.sign({ phone, verified: true }, JWT_SECRET, {
      expiresIn: "10m",
    });

    return res.status(200).json({
      success: true,
      message: "Phone verified",
      verificationToken,
    });
  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
});

// Route to add the customer to db after verification
router.post(
  "/register/complete",
  verifyRegisterToken,
  async (req: Request, res: Response) => {
    // Use zod schema to verify data from request body..
    const { success, error, data } = customerRegisterSchema.safeParse(req.body);

    // If invalid input then send the response
    if (!success)
      return res.status(400).json({
        success: false,
        message: "Invalid Input!!",
        error: error.flatten(),
      });

    try {
      // Check if existing customer already exists..
      const result = await checkExistingCustomer(data.email);

      if (result)
        return res.status(409).json({
          success: false,
          message: "Customer already exists!! Try Login..",
        });

      // Get the phone number from the jwt token
      const phone = (req as any).verifiedPhone;

      // Create new customer entry
      const newCustomer = await createCustomer(data, phone);

      if (!newCustomer)
        return res.status(500).json({
          success: false,
          message: "Failed to register!!",
        });

      return res.status(201).json({
        success: true,
        message: "Customer registred successfully!!!",
        newCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!!",
      });
    }
  }
);

export default router;
