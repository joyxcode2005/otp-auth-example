import prisma from "../config/prisma";
import { PaymentMethod, FeedType } from "@prisma/client";

// Interface for the create customer args
interface createCustomerSchema {
  name: string;
  email: string;
  gstNumber: string;
  address: string;
  latitude?: number;
  longitude?: number;
  documents: string[];
}

//interface for customer update
export interface updatedCustomerSchema {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Function to check if customer already exists!!!
export async function checkExistingCustomer(phone: string) {
  const existing = await prisma?.customer.findFirst({
    where: {
      OR: [{ phone }],
    },
  });

  return existing;
}

export async function checkExistingCustomerWithEmail(email: string) {
  const existing = await prisma?.customer.findFirst({
    where: {
      OR: [{ email }],
    },
  });

  return existing;
}

// Function to create a new customer!!
export async function createCustomer(
  data: createCustomerSchema,
  phone: string
) {
  // Destructuring the data
  const { name, email, gstNumber, address, latitude, longitude, documents } =
    data;

  // Using prisma client to add customer to db
  return await prisma?.customer.create({
    data: {
      name,
      phone,
      email,
      gstNumber,
      address,
      latitude,
      longitude,
      documents,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      gstNumber: true,
      address: true,
    },
  });
}

export async function updateCustomer(
  data: updatedCustomerSchema,
  customerId: string
) {
  return await prisma?.customer.update({
    where: { id: customerId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
    }, // explicitly select public fields (do not return password/secret fields)
  });
}

export async function findUniqueCustomer(customerId: string) {
  return await prisma?.customer.findUnique({
    where: { id: customerId },
  });
}

export async function placeOrder(
  customerId: string,
  deliveryDate: string,
  paymentMethod: PaymentMethod | undefined,
  totalAmount: number,
  paidAmount: number,
  items: Array<{ feedType: FeedType; quantity: number; price: number }>
) {
  return await prisma?.order.create({
    data: {
      customerId,
      deliveryDate: new Date(deliveryDate),
      paymentMethod,
      totalAmount,
      paidAmount,
      pendingAmount: totalAmount - paidAmount ,

      items: {
        create: items.map((i) => ({
          feedType: i.feedType,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });
}
