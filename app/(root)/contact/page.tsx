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
import BtnLoadSpinner from "@/components/BtnLoadSpinner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendContactformMessage } from "@/utils/actions/site.actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "subject must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(10, {
    message: "message must be at least 10 characters.",
  }),
});

function ContactPage() {
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      return sendContactformMessage(values);
    },
    onSuccess: () => {
      // Handle success

      setHasSentMessage(true);
    },
    onError: (error) => {
      // An error happened!
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    mutate(values);
  }

  const loading = isPending;
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
            {hasSentMessage ? (
              <div className="flex h-full flex-col items-center gap-5">
                <DotLottieReact
                  src="https://lottie.host/f03737ec-6c1a-4216-955b-41d9c2dec2f8/R5JYtXZIry.lottie"
                  autoplay
                />
                <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
                  Message sent!
                </h2>
                <p className="-mt-3 max-w-[400px] text-center text-siteText">
                  Your message has been sent successfully. We will get back to
                  you in 48 hours, or less. Thank you!
                </p>

                <CustomButton
                  onClickFn={() => setHasSentMessage(false)}
                  text="Send new message"
                  bgColor="orange"
                  hoverBgColor="green"
                  textColor="white"
                />
              </div>
            ) : (
              <>
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
                          <FormLabel className="ml-2 font-archivo capitalize">
                            name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-16 rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2 font-archivo capitalize">
                            subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-16 rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
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
                          <FormLabel className="ml-2 font-archivo capitalize">
                            email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="h-16 rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
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
                          <FormLabel className="ml-2 font-archivo capitalize">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[230px] rounded-xl border-none bg-white p-5 font-archivo text-lg shadow-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-4 self-end">
                      <CustomButton
                        text={
                          <div className="flex items-center justify-center gap-3">
                            send message
                            {loading && (
                              <span className="ml-2 text-white/30">
                                <BtnLoadSpinner />
                              </span>
                            )}
                          </div>
                        }
                        iconPosition="left"
                        bgColor="green"
                        hoverBgColor="orange"
                        textColor="white"
                        icon={<LiaHeadsetSolid />}
                      />
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
