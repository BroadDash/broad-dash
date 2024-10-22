"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { orderServerSchema } from "@/schema/order";
import {
  createOrder as createOrderDb,
  updateOrder as updateOrderDb,
} from "@/server/db/order";

export async function createOrder(
  unsafeData: z.infer<typeof orderServerSchema>
) {
  const { userId } = auth();
  const { success, data } = orderServerSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }
  const value = await createOrderDb(data);
  return value;
}

export async function updateOrder(
  unsafeData: z.infer<typeof orderServerSchema>
) {
  const { userId } = auth();
  const { success, data } = orderServerSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }
  const value = await updateOrderDb(data);
  return value;
}
