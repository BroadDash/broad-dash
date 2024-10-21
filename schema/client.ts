import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  clientId: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
});
