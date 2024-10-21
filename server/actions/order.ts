"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { orderSchema } from "@/schema/order";
import { createOrder as createOrderDb } from "@/server/db/order";

export async function createOrder(unsafeData: z.infer<typeof orderSchema>) {
  const { userId } = auth();
  const { success, data } = orderSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }

  const value = await createOrderDb(data);
  console.log("created sucessfully :", value);
}
