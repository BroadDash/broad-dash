import { Suspense } from "react";

import ClientCard from "@/components/ClientCard";
import OrderFormTester from "@/components/OrderFormTester";
import OrderTable from "@/components/OrderTable";

const client = {
  id: "25b1f843-b3db-4e98-9a49-3ff69846e9dc",
  clientId: "testId",
  name: "Test user",
  phone: "08888999900",
  email: "testingemail@gmail.com",
  address: "testing state, testing street, state, 111000",
  createdAt: "2024-10-25T08:40:03.826Z",
};
export default function ClientPage() {
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
