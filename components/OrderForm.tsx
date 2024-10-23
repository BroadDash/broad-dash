"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { orderFormSchema } from "@/schema/order";
import { createOrder, updateOrder } from "@/server/actions/order";

export function OrderForm({
  initialData = {
    plan: null,
    validity: null,
    activationDate: null,
    amount: "",
    paymentStatus: null,
  },
}: {
  initialData: z.infer<typeof orderFormSchema>;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const isEdit = initialData.plan !== null;
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: initialData,
  });

  async function onSubmit(formData: z.infer<typeof orderFormSchema>) {
    try {
      const { activationDate, validity, amount, paymentStatus, plan } =
        formData;
      const expiryDate = new Date(activationDate);
      expiryDate.setMonth(expiryDate.getMonth() + parseInt(validity));
      // get clientId from pathname
      const clientId = "01361021-bb32-47ee-bdc1-1f7cae2d8378";
      let data = {
        clientId,
        activationDate,
        expiryDate,
        amount,
        paymentStatus,
        plan,
        validity,
      };
      let value = null;
      if (isEdit) {
        const orderId = "2252c5a7-9dd5-45bc-b413-a2b04e565d1a";
        data = { ...data, id: orderId };
        value = await updateOrder(data);
      } else {
        value = await createOrder(data);
      }
      console.log("returned from action:", value);
      form.reset({
        plan: null,
        validity: null,
        activationDate: null,
        amount: "",
        paymentStatus: null,
      });
    } catch (error) {
      console.log({
        title: "Error",
        error,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Internet plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      <span
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        {field.value ? field.value : "Select plan"}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="100 Mbps Unlimited">
                    100 Mbps Unlimited
                  </SelectItem>
                  <SelectItem value="200 Mbps Unlimited">
                    200 Mbps Unlimited
                  </SelectItem>
                  <SelectItem value="300 Mbps Unlimited">
                    300 Mbps Unlimited
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      <span
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        {field.value ? field.value : "Select validity"}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Activation Date</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const adjustedDate = new Date(
                          date.getTime() - date.getTimezoneOffset() * 60000
                        );
                        field.onChange(adjustedDate);
                        setIsCalendarOpen(false);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      date >
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter amount"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      <span
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        {field.value ? field.value : "Select payment status"}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isEdit ? "Update Order" : "Create Order"}
        </Button>
      </form>
    </Form>
  );
}
