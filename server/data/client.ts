import { auth } from "@clerk/nextjs/server";

import { getClientDetails as getClientDetailsDb } from "@/server/db/client";

export async function getClientDetails(id: string) {
  const { userId } = auth();
  if (userId == null) {
    return { error: true, message: "Not authorized." };
  }
  const value = await getClientDetailsDb(id);
  return value;
}
