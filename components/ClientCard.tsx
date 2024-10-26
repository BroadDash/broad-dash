import { Calendar, IdCard, LayoutList, Mail, Phone } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formattedDate } from "@/lib/utils";
import { clientSchema } from "@/schema/client";

export const createdClientSchema = clientSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

type ClientCardProps = z.infer<typeof createdClientSchema>;

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

export default function ClientCard(
  { name, clientId, phone, email, address, createdAt }: ClientCardProps = {
    id: "",
    clientId: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    createdAt: "",
  }
) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name ?? "No Name"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 items-center gap-4 tracking-tight">
          <span className="flex h-7 min-w-0 items-center gap-2 font-semibold md:min-w-24">
            Details
          </span>
          <Button className="h-7 justify-self-end rounded-sm px-4 font-semibold">
            Edit
          </Button>
        </div>
        <InfoRow icon={IdCard} label="Client ID" value={clientId ?? "N/A"} />
        <InfoRow icon={Phone} label="Phone" value={phone ?? "N/A"} />
        <InfoRow icon={Mail} label="Email" value={email ?? "N/A"} />
        <InfoRow icon={LayoutList} label="Address" value={address ?? "N/A"} />
        <InfoRow
          icon={Calendar}
          label="Created at"
          value={formattedDate(createdAt ?? "")}
        />
      </CardContent>
    </Card>
  );
}
