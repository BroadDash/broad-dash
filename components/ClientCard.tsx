import { Calendar, IdCard, LayoutList, Mail, Phone } from "lucide-react";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formattedDate } from "@/lib/utils";
import { clientSchema } from "@/schema/client";

export const createdClientSchema = clientSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

type ClientCardProps = z.infer<typeof createdClientSchema>;

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
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
            <IdCard className="h-4 w-4" /> Client ID
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {clientId}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
            <Phone className="h-4 w-4" />
            Phone
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {phone}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
            <Mail className="h-4 w-4" /> Email
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {email}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
            <LayoutList className="h-4 w-4" /> Address
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {address}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="flex h-7 flex-row items-center gap-2 text-muted-foreground md:min-w-24">
            <Calendar className="h-4 w-4" />
            Created at
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {formattedDate(createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
