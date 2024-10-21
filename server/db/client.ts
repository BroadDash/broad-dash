import { z } from "zod";

import { db } from "@/lib/db";
import { clientSchema } from "@/schema/client";

export async function createClient(data: z.infer<typeof clientSchema>) {
  console.log("creating client in db... ");
  try {
    const value = await db.client.create({
      data,
    });
    console.log(value);
    return value;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to create client.");
  }
}
