import * as z from "zod";

export const IspSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a ISP name",
  }),
});

export const ClientSchema = z.object({
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
  ispId: z.string().optional(),
});
