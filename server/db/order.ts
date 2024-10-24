import { z } from "zod";

import { db } from "@/lib/db";
import { createOrderSchema, updateOrderSchema } from "@/schema/order";

export async function createOrder(data: z.infer<typeof createOrderSchema>) {
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

export async function updateOrder(data: z.infer<typeof updateOrderSchema>) {
  try {
    const { id, ...updateData } = data;
    const value = await db.order.update({
      where: { id },
      data: updateData,
    });
    return value;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to update order.");
  }
}

export async function getOrders(clientId: string) {
  try {
    const orders = await db.order.findMany({
      where: { clientId },
    });
    return orders;
  } catch (error) {
    console.error("Failed to get orders:", error);
    throw new Error("Failed to get orders.");
  }
}
