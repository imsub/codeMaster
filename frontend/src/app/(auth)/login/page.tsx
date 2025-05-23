"use client";
import { useEffect } from "react";
import { LoginForm } from "@/components/login-form";
import { CodeBackground } from "@/components/backgroundCode";
export default function LoginPage() {
  useEffect(() => {
    async function login(email: string, password: string) {
      try {
        const response = await fetch("http://localhost:4000/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log("Auth refreshed successfully:", result);
        } else {
          console.error("Failed to refresh auth:", result);
        }
      } catch (error) {
        console.error("Error refreshing auth:", error);
      }
    }
    login("jalan_subham@yahoo.in", "yahoo@RR22");
  }, []);
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-auto">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <LoginForm />
        </div>
      </div>
      {/* <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"> */}
      <CodeBackground
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your journey with us. Don't have an account? Create one now."
        }
      />
      {/* </div> */}
    </div>
  );
}
