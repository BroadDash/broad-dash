import { z } from "zod";

import { db } from "@/lib/db";
import { clientSchema } from "@/schema/client";

export async function createClient(data: z.infer<typeof clientSchema>) {
  try {
    const value = await db.client.create({
      data,
    });
    return value;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to create client.");
  }
}

export async function getClientDetails(id: string) {
  try {
    const value = await db.client.findUnique({
      where: {
        id,
      },
    });
    return value;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to find any client.");
  }
}
