import { z } from "zod";

export const customerRegisterSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  gstNumber: z.string().max(14),
  address: z.string(),
  latitude: z.float64().optional(),
  longitude: z.float64().optional(),
  documents: z.array(z.string()),
});

export const customerLoginSchema = z.object({
  phone: z.string().max(10),
  otp: z.string().max(6),
});

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        feeType: z.enum(["POULTRY", "FISH", "CATTLE", "SWINE", "PET", "OTHER"]),
        quantity: z.number().positive(),
        price: z.number().positive(),
      })
    )
    .min(1),
  paymentMethod: z.enum(["CASH", "UPI", "BANK_TRANSFER", "CHEQUE"]).optional(),
  paidAmount: z.number(),
  deliveryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
});
