"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateClient } from "@/actions/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClientSchema } from "@/schemas";

export function ClientForm({ ispId }: { ispId: string }) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isloading, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      clientId: "",
      phone: "",
      email: "",
      address: "",
      ispId: ispId,
    },
  });

  async function onSubmit(values: z.infer<typeof ClientSchema>) {
    startTransition(() => {
      CreateClient(values).then((data) => {
        //@ts-ignore
        setErrorMessage(data?.error);
        //@ts-ignore
        if (!data?.error) {
          setIsDialogOpen(false);
        }
      });
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black"
        onClick={() => setIsDialogOpen(true)}
      >
        Create Client
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <h1>Name *</h1>
                  <FormControl>
                    <Input
                      placeholder="This is your public display name"
                      {...field}
                      className={isloading ? "animate-pulse duration-700" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <h1>Client ID</h1>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className={isloading ? "animate-pulse duration-700" : ""}
                    />
                  </FormControl>
                  <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <h1>Phone Number *</h1>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className={isloading ? "animate-pulse duration-700" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <h1>Email Address *</h1>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className={isloading ? "animate-pulse duration-700" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <h1>Address</h1>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className={isloading ? "animate-pulse duration-700" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isloading}
              className={isloading ? "animate-pulse duration-700" : ""}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
