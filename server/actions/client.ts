"use server";

import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { clientSchema } from "@/schema/client";
import { createClient as createClientDb } from "@/server/db/client";

export async function createClient(unsafeData: z.infer<typeof clientSchema>) {
  const { userId } = auth();
  const { success, data } = clientSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating Client." };
  }

  const { clientId } = await createClientDb(data);
  // once client is created redirect to /client/${clientId} no need to return anything as error is already handled above
  redirect(`/client/${clientId}`);
}
