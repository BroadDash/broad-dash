import { ClientForm } from "@/components/ClientForm";
import { Separator } from "@/components/ui/separator";
import { getClientsByIsp } from "@/data/client";

import { Clients, columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DashboardPage({
  params,
}: {
  params: { ispId: string };
}) {
  const ispId = params.ispId;
  //@ts-ignore
  const clients = (await getClientsByIsp(ispId)) || [];

  return (
    <div className="w-screen">
      <div className="mx-6 flex h-16 items-center justify-between">
        <h1 className="text-lg font-semibold">Clients</h1>
        <ClientForm ispId={params.ispId} />
      </div>
      <Separator />
      <div className="">
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  );
}
