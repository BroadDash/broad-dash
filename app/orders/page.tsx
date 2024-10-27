import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Orders, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Orders[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728e2342f",
      servicePlan: "200 Mbps unlimited",
      expiryDate: "6 Jan 2025",
      amount: 100,
      payemntStatus: "Partially Paid",
    },
    {
      id: "728efgsdf42f",
      servicePlan: "500 Mbps unlimited",
      expiryDate: "7 Feb 2025",
      amount: 100,
      payemntStatus: "Partially Paid",
    },
    {
      id: "72345345342f",
      servicePlan: "1 Gbps unlimited",
      expiryDate: "10 Jan 2025",
      amount: 100,
      payemntStatus: "Partially Paid",
    },
    {
      id: "728e345342f",
      servicePlan: "2 Gbps unlimited",
      expiryDate: "20 March 2025",
      amount: 100,
      payemntStatus: "Partially Paid",
    },
    {
      id: "728349rh42f",
      servicePlan: "50 Mbps unlimited",
      expiryDate: "31 Dec 2025",
      amount: 100,
      payemntStatus: "Partially Paid",
    },
    // ...
  ];
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div className="w-screen">
      <div className="mx-6 flex h-16 items-center justify-between">
        <h1 className="text-lg font-semibold">Clients</h1>
        <Button className="text-sm" size="sm">
          Create client
        </Button>
      </div>
      <Separator />
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
