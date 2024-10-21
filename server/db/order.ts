import { z } from "zod";

import { db } from "@/lib/db";
import { orderSchema } from "@/schema/order";

export async function createOrder(data: z.infer<typeof orderSchema>) {
  return data;
  // try {
  //   const value = await db.client.create({
  //     data,
  //   });
  //   console.log(value);
  //   return value;
  // } catch (error) {
  //   console.error("Error details:", error);
  //   throw new Error("Failed to create client.");
  // }
}
