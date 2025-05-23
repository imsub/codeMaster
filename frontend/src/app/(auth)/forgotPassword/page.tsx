"use client";
import { ForgotPasswordForm } from "@/components/forgotPassword";
import { CodeBackground } from "@/components/backgroundCode";
export default function SignupPage() {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-auto">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <ForgotPasswordForm />
        </div>
      </div>
      {/* <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"> */}
      <CodeBackground
        title={"Welcome back!"}
        subtitle={"Sign up to continue your journey with us. Create one now."}
      />
      {/* </div> */}
    </div>
  );
}
