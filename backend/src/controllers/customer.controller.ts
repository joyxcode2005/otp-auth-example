import primsa from "../config/prisma";

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

// Function to check if customer already exists!!!
export async function checkExistingCustomer(phone: string) {
  const existing = await primsa?.customer.findFirst({
    where: {
      OR: [{ phone }],
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
  return await primsa?.customer.create({
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
