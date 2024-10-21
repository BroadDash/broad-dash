import { z } from "zod";

import { clientSchema } from "@/schema/client";

export async function createClient(data: z.infer<typeof clientSchema>) {
  console.log("creating client in db... ");
  // create client in db, update local cache and return newly created client.
  return data;
}
