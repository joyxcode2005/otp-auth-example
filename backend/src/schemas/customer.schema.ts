import z, { email } from "zod";

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
