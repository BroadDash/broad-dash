"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { orderServerSchema } from "@/schema/order";
import { createOrder as createOrderDb } from "@/server/db/order";

export async function createOrder(
  unsafeData: z.infer<typeof orderServerSchema>
) {
  const { userId } = auth();
  const { success, data } = orderServerSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }

  const value = await createOrderDb(data);
  console.log("created sucessfully :", value);
}
