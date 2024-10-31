"use server";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import * as z from "zod";

import { getIsp } from "@/data/isp";
import { db } from "@/lib/db";
import { IspSchema } from "@/schemas";

export const CreateIsp = async (values: z.infer<typeof IspSchema>) => {
  const user = auth();

  if (!user) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const validationFields = IspSchema.safeParse(values);
  // @ts-ignore
  const { name } = validationFields.data;

  const existingIsp = await getIsp(name);

  if (existingIsp) {
    return { error: "ISP already exists" };
  }

  const isp = await db.iSP.create({
    data: {
      name,
    },
  });

  redirect(`/dashboard/${isp.id}`);
};
