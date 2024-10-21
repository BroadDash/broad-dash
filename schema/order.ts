import { z } from "zod";

export const orderSchema = z.object({
  plan: z.enum([
    "100 Mbps Unlimited",
    "200 Mbps Unlimited",
    "300 Mbps Unlimited",
  ]),
  validity: z.enum(["1", "3", "6", "12"]),
  activationDate: z.string(), // or date()
  // expiryDate: z.string().optional(),
  amount: z.string(),
  paymentStatus: z.enum(["Paid", "Unpaid", "Partially Paid"]),
});
