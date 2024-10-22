import { z } from "zod";

import { db } from "@/lib/db";
import { orderServerSchema } from "@/schema/order";

export async function createOrder(data: z.infer<typeof orderServerSchema>) {
  try {
    const value = await db.order.create({
      data,
    });
    return value;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to create order.");
  }
}
