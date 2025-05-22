"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const formSchema = z
  .object({
    firstName: z.string().min(3, { message: "Must be at least 3 characters" }),
    middleName: z.string().min(3, { message: "Must be at least 3 characters" }),
    lastName: z.string().min(3, { message: "Must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message: "Include uppercase, lowercase, number, and special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Signup:", values);
  };

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 space-y-4"
          >
            {[
              "firstName",
              "middleName",
              "lastName",
              "email",
              "password",
              "confirmPassword",
            ].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="inline-flex items-center gap-1">
                      {field.name
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                      {["firstName", "email", "password"].includes(
                        field.name
                      ) && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={
                          ["password", "confirmPassword"].includes(field.name)
                            ? "password"
                            : "text"
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
