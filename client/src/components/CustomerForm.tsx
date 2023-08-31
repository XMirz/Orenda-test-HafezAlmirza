import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "./ui/textarea";
import { Customer, CustomerForm as CustomerFormType } from "utils/types";

type Props = {
  defaultValues?: Customer;
  onSubmit: (customer: CustomerFormType) => void;
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Min 6 characters.",
    })
    .max(50, { message: "Max 60 characters." }),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" })
    .regex(phoneRegex, "Must be a valid mobile number"),
  email: z.string().email({ message: "Must be a valid email" }),
  address: z.string().min(12, { message: "Minimun 12 Character" }),
});

export default function CustomerForm({ defaultValues, onSubmit }: Props) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => {
          onSubmit(values);
        })}
        className="h-full flex flex-col justify-between gap-y-12"
      >
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col flex-1 gap-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-x-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="h-max flex-1">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-max resize-none"
                      rows={5}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-8 pb-2">
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="flex flex-row justify-end gap-x-4">
            <Button
              variant={"outline"}
              onClick={() => {
                navigate(-1);
              }}
              className="px-12"
            >
              Submit
            </Button>
            <Button
              variant={"destructive"}
              type="submit"
              className="bg-red-700 px-12"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
