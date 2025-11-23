import { Router, Request, Response } from "express";
import { normalizePhone } from "../utils/normalizePhone";
import { sendOtp } from "../services/otp.service";

// Loading environment variables

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
      });
      
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!!",
    });
  }
});

// TODO: Route to accept the otp and verify it

export default router;
