import { db } from "@/lib/db";

export const getIsp = async (name: string) => {
  try {
    const isp = await db.iSP.findFirst({
      where: {
        name,
      },
    });
    return isp;
  } catch {
    return null;
  }
};
