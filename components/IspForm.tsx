"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateIsp } from "@/actions/isp";
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
import { IspSchema } from "@/schemas";

export function IspForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof IspSchema>>({
    resolver: zodResolver(IspSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof IspSchema>) => {
    setErrorMessage("");
    console.log(values);
    CreateIsp(values).then((data) => {
      //@ts-ignore
      setErrorMessage(data?.error);
    });
  };

  return (
    <Dialog onOpenChange={() => onSubmit}>
      <DialogTrigger className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black">
        Create ISP
      </DialogTrigger>
      <DialogContent className="w-full">
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
                    />
                  </FormControl>
                  <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}