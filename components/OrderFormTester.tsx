"use client";

import { useState } from "react";

import { OrderForm } from "@/components/OrderForm";
import { Button } from "@/components/ui/button";

const data = {
  id: "fcc0f2b7-56f5-4b77-b0b7-e0ce0305d2da",
  clientId: "01361021-bb32-47ee-bdc1-1f7cae2d8378",
  plan: "300 Mbps Unlimited",
  amount: "2000",
  validity: "6",
  paymentStatus: "Paid",
  createdAt: "2024-10-22T10:19:13.130Z",
  activationDate: new Date("2024-10-31T00:00:00.000Z"),
  expiryDate: "2025-05-01T00:00:00.000Z",
};

export default function OrderFormTester() {
  const [formMode, setFormMode] = useState<"create" | "edit" | "">(""); // Manage form mode state

  return (
    <div className="space-x-4 space-y-8">
      <div className="text-lg">Client Details page</div>
      <Button onClick={() => setFormMode("create")}>Create Form</Button>

      <Button onClick={() => setFormMode("edit")}>Edit Form</Button>

      {formMode === "create" && <OrderForm />}
      {formMode === "edit" && <OrderForm initialData={data} />}
    </div>
  );
}
