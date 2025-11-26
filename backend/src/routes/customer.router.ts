import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { normalizePhone } from "../utils/normalizePhone";
import { sendOtp, verifyOtp } from "../services/otp.service";
import {
  createOrderSchema,
  customerRegisterSchema,
} from "../schemas/customer.schema";
import {
  findUniqueCustomer,
  placeOrder,
  updatedCustomerSchema,
} from "../controllers/customer.controller";
import {
  checkExistingCustomer,
  checkExistingCustomerWithEmail,
  createCustomer,
  updateCustomer,
} from "../controllers/customer.controller";
import {
  customerAuthMiddleware,
  verifyRegisterToken,
} from "../middlewares/customer.middleware";
import prisma from "../config/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();

// ======================
// Register Route
// ======================

// Route to send generate the otp and send it to the user
router.post("/gen-otp", async (req: Request, res: Response) => {
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

    res.cookie("customer_phone_verify_token", verificationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Phone verified",
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
      // Get the phone number from the jwt token
      const phone = (req as any).verifiedPhone;

      // Check if existing customer already exists..
      const result = await checkExistingCustomer(phone);

      if (result)
        return res.status(409).json({
          success: false,
          message: "Customer already exists!! Try Login..",
        });

      // Create new customer entry
      const newCustomer = await createCustomer(data, phone);

      if (!newCustomer)
        return res.status(500).json({
          success: false,
          message: "Failed to register!!",
        });

      // Generate JWT for the customer
      const token = jwt.sign(
        {
          id: newCustomer.id,
          email: newCustomer.email,
          phone: newCustomer.phone,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Set token in HTTPOnly cookie
      res.cookie("customer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
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

// ======================
// Login Route
// ======================

router.post("/login/verify", async (req: Request, res: Response) => {
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

    // Check if existing customer already exists..
    const existingCustomer = await checkExistingCustomer(phone);

    if (!existingCustomer)
      return res.status(404).json({
        success: false,
        message: "Customer is not registerd!! Register first!!",
      });

    // Generate JWT for the customer
    const token = jwt.sign(
      {
        id: existingCustomer.id,
        email: existingCustomer.email,
        phone: existingCustomer.phone,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in HTTPOnly cookie
    res.cookie("customer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Customer logged In successfully!!!",
      existingCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
});

// Setting up the auth middleware for protected routes
router.use(customerAuthMiddleware);

// Test route to see if the cookies are properly being set
router.get("/info", async (req: Request, res: Response) => {
  const customer = (req as any).customer;

  const customerDetails = await prisma?.customer.findFirst({
    where: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      gstNumber: true,
      address: true,
      documents: true,
      feedTypes: true,
      notes: true,
      paymentTerms: true,
    },
  });

  if (!customerDetails)
    return res.status(404).json({
      success: false,
      message: "User not found!!!",
    });

  return res.status(200).json({
    success: true,
    message: "Customer details",
    customer: customerDetails,
  });
});

// Route to update the customer data
router.patch("/update", async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).customer.id as string;

    // Extract possible fields
    const { name, email, phone, address } = req.body;

    // Build update object ONLY with provided fields
    const dataToUpdate: updatedCustomerSchema = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (phone !== undefined) dataToUpdate.phone = phone;
    if (address !== undefined) dataToUpdate.address = address;

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No updatable fields provided.",
      });
    }

    // ensure email is unique
    if (dataToUpdate.email) {
      const existing = await checkExistingCustomerWithEmail(dataToUpdate.email);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Email already in use.",
        });
      }
    }

    // Update customer using your controller method
    const updatedCustomer = await updateCustomer(dataToUpdate, customerId);

    return res.json({
      success: true,
      message: "Customer updated successfully.",
      customer: updatedCustomer,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
});

// POST /:customerId/order
router.post("/:customerId/order", async (req: Request, res: Response) => {
  const { customerId } = req.params;

  console.log("customer id: ", customerId)

  // Validate request body
  const parsed = createOrderSchema.safeParse(req.body);
  
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const { items, paymentMethod, deliveryDate , paidAmount} = parsed.data;

  try {
    // Check if customer exists
    const customer = await findUniqueCustomer(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Calculate totals
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // FIXED: Correct parameter order — normalize item property name (feeType -> feedType)
    const orderItems = items.map((i: any) => ({
      feedType: i.feedType ?? i.feeType,
      quantity: i.quantity,
      price: i.price,
    }));

    const order = await placeOrder(
      customerId,
      deliveryDate,
      paymentMethod,
      totalAmount,
      paidAmount,
      orderItems
    );

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("Order placement failed:", err);
    return res.status(500).json({
      error: "Something went wrong while placing the order",
    });
  }
});

export default router;
