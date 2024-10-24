import { getOrders } from "@/server/db/order";

export default async function OrderTable() {
  const orders = await getOrders("01361021-bb32-47ee-bdc1-1f7cae2d8378");

  return (
    <div>
      <div>OrderTable</div>
      {orders?.map((order) => (
        <div key={order.id} className="flex gap-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Created At:</strong>
            {order.createdAt.toLocaleString()}
          </p>
          <p>
            <strong>Plan:</strong> {order.plan}
          </p>
        </div>
      ))}
    </div>
  );
}
