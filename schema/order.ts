import { z } from "zod";

export const orderFormSchema = z.object({
  plan: z.enum([
    "100 Mbps Unlimited",
    "200 Mbps Unlimited",
    "300 Mbps Unlimited",
  ]),
  validity: z.enum(["1", "3", "6", "12"]),
  activationDate: z.date(),
  amount: z.string(), //  TODO: amount: z.string().regex(/^\d+$/, "Amount must be a number"),
  paymentStatus: z.enum(["Paid", "Unpaid", "Partially Paid"]),
});

export const createOrderSchema = orderFormSchema.extend({
  clientId: z.string(),
  expiryDate: z.date(),
});

export const updateOrderSchema = orderFormSchema.extend({
  id: z.string(),
  clientId: z.string(),
  expiryDate: z.date(),
});
