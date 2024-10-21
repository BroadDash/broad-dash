import { OrderForm } from "@/components/OrderForm";

export default function ClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  return (
    <div className="space-y-8">
      <div>Order form</div>
      <OrderForm />
    </div>
  );
}
