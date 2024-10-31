"use server";

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import * as z from "zod";

import { getClientById } from "@/data/client";
import { db } from "@/lib/db";
import { ClientSchema } from "@/schemas";

export const CreateClient = async (values: z.infer<typeof ClientSchema>) => {
  const user = auth();

  if (!user) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const validationFields = ClientSchema.safeParse(values);
  // @ts-ignore
  const { name, clientId, phone, email, address, ispId } =
    validationFields.data;

  const existingClient = await getClientById(clientId);

  if (existingClient) {
    return { error: "Client already exists with this id" };
  }
  await db.client.create({
    data: {
      name,
      clientId,
      phone,
      email,
      address,
      ispId,
    },
  });
};
