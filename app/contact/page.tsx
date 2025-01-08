"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LiaHeadsetSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/ui/CustomButton";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(10, {
    message: "message must be at least 10 characters.",
  }),
});

function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="relative flex w-full py-[100px]">
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 border-t px-6 md:container">
        <div className="mt-20 flex flex-col gap-10 lg:flex-row">
          <div className="flex basis-1/2 flex-col items-start gap-2">
            <span className="rounded bg-siteGreen/5 px-4 py-1 font-semibold uppercase text-siteGreen">
              Contact
            </span>
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-3xl font-bold md:text-5xl">Get In Touch</h3>
              <p className="text-lg text-siteText">
                Discover our competitive pricing structure designed to provide
                accessible financial services without compromising quality.
                Empower your financial future today.
              </p>
            </div>
          </div>
          <div className="flex basis-1/2 rounded-3xl bg-siteGreen/5 px-5 py-6 shadow md:px-7 md:py-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-16 rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
                          placeholder="Name"
                          {...field}
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
                      <FormLabel className="hidden">email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-16 rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[230px] rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
                          placeholder="message"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 self-end">
                  <CustomButton
                    text="Submit"
                    iconPosition="left"
                    bgColor="green"
                    hoverBgColor="orange"
                    textColor="white"
                    icon={<LiaHeadsetSolid />}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
