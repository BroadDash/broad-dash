import { Suspense } from "react";

import ClientCard from "@/components/ClientCard";
import OrderFormTester from "@/components/OrderFormTester";
import OrderTable from "@/components/OrderTable";
import { getClientDetails } from "@/server/data/client";

export default async function ClientPage({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  const client = await getClientDetails(clientId);
  return (
    <div className="space-x-4 space-y-8">
      <ClientCard {...client} />
      {/* <Suspense fallback={<div>Loading orders...</div>}>
        <OrderTable />
      </Suspense> */}
      <OrderFormTester />
    </div>
  );
}
