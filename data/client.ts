import { db } from "@/lib/db";

export const getClientById = async (clientId: { clientId: string }) => {
  try {
    const client = await db.client.findFirst({
      where: {
        //@ts-ignore
        clientId,
      },
    });
    return client;
  } catch (error) {
    return null;
  }
};

export const getClientsByIsp = async (ispId: { ispId: string }) => {
  try {
    const client = await db.client.findMany({
      where: {
        //@ts-ignore
        ispId,
      },
    });
    return client;
  } catch (error) {
    return null;
  }
};
