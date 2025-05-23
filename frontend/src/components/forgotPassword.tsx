"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation"; // or 'next/router' for Pages Router
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message: "Include uppercase, lowercase, number, and special character.",
    }),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // call your login logic here
  }
  const router = useRouter();
  return (
    <div className={className} {...props}>
      <Card className="mx-auto max-w-md">
        <CardHeader className="pb-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-600 dark:text-sky-400 hover:text-green-600 dark:hover:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold mb-2">
            Forgot Password
          </CardTitle>

          <div className="flex justify-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-md border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="inline-flex items-center gap-4">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full p-2 rounded-md bg-zinc-900 text-white placeholder:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="example@codeduster.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset my password
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline underline-offset-4" href="/signup">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
