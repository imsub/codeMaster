"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code } from "lucide-react";
//import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { FaGoogle } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message: "Include uppercase, lowercase, number, and special character.",
    }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    authUser,
    isAuthenticated,
    login,
    logout,
    signup,
    checkAuth,
    isSigninUp,
    isLoggingIn,
    isCheckingAuth,
  } = useAuth();

  console.log(
    authUser,
    isAuthenticated,
    login,
    logout,
    signup,
    checkAuth,
    isSigninUp,
    isLoggingIn,
    isCheckingAuth
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login(values);
    console.log(
      authUser,
      isAuthenticated,
      isSigninUp,
      isLoggingIn,
      isCheckingAuth
    );
    console.log("Login result:");
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoggingIn, router]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <Card className="mx-auto max-w-md">
        <CardHeader className="pb-9 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10  flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-600/100 dark:text-sky-400/100 hover:text-green-600 dark:hover:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <FormLabel className="inline-flex items-center gap-4">
                        Password <span className="text-red-500">*</span>
                      </FormLabel>

                      <Link
                        className="hover:underline ml-auto inline-block text-sm underline-offset-4"
                        href="/forgotPassword"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        className="w-full p-2 rounded-md bg-zinc-900 text-white placeholder:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#e5e5e5", color: "black" }}
                type="submit"
                className="px-6 py-2 rounded-lg font-medium"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#e5e5e5", color: "black" }}
                type="submit"
                className="px-6 py-2 rounded-lg font-medium"
              >
                <div className="flex justify-center items-center">
                  <FaGoogle className="mr-2 text-white-500" />
                  Login with Google
                </div>
              </motion.button>
              {/* <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline underline-offset-4" href="/signup">
              Sign up
            </Link>
          </div>
          <br />
          <CardFooter>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
