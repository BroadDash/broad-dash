"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  clientId: z.string().optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

export const ClientForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    const registration_time = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    console.log({ ...data, registration_time });
    reset();
  };

  return (
    <form className="m-6 max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Add new Client</CardTitle>
          <CardDescription>
            Fill in the information for a new client here. Click save when
            you&apos;re done.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="" {...register("name")} />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="" {...register("phone")} />
            {errors.phone && (
              <div className="text-red-500">{errors.phone.message}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input id="clientId" defaultValue="" {...register("clientId")} />
            {errors.clientId && (
              <div className="text-red-500">{errors.clientId.message}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="" {...register("email")} />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="" {...register("address")} />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>
          <div className="space-y-2">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="rounded-xl px-4"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
