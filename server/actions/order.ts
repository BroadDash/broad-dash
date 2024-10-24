"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { createOrderSchema, updateOrderSchema } from "@/schema/order";
import {
  createOrder as createOrderDb,
  updateOrder as updateOrderDb,
} from "@/server/db/order";

export async function createOrder(
  unsafeData: z.infer<typeof createOrderSchema>
) {
  const { userId } = auth();
  const { success, data } = createOrderSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }
  const value = await createOrderDb(data);
  return value;
}

export async function updateOrder(
  unsafeData: z.infer<typeof updateOrderSchema>
) {
  const { userId } = auth();
  const { success, data } = updateOrderSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }
  const value = await updateOrderDb(data);
  return value;
}
