import { Suspense } from "react";

import OrderFormTester from "@/components/OrderFormTester";
import OrderTable from "@/components/OrderTable";

export default function ClientPage() {
  return (
    <div className="space-x-4 space-y-8">
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrderTable />
      </Suspense>
      <OrderFormTester />
    </div>
  );
}
