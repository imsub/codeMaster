"use client";
import { ForgotPasswordForm } from "@/components/forgotPassword";
import { CodeBackground } from "@/components/backgroundCode";
import FloatingIcon from "@/components/FloatingIcon";
import { usePathname } from 'next/navigation';
import img from "../../../../public/3logo.png";
import Link from "next/link";
import Image from "next/image";
export default function SignupPage() {
  const pathname = usePathname();

  return (
     <div className="flex flex-col">
      <FloatingIcon />
      <div className="flex justify-center items-center items-center">
        <Link href={"/"} className="flex items-center gap-1">
          {/* <Code className="h-6 w-6 text-primary" /> */}
          <div className="flex items-center justify-center items-center pt-[1em]">
            <Image
              className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              style={{ borderRadius: "10px" }}
              loading="lazy"
              src={img}
              width={75}
              height={75}
              quality={90}
              alt="Logo for code Duster"
            />
          </div>

          <span className="text-5xl font-bold">
            Code <span style={{ color: "#00D6C4" }}>Duster</span>
          </span>
        </Link>
      </div>

      <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-auto">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <ForgotPasswordForm />
          </div>
        </div>
        {/* <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"> */}
        <CodeBackground key={pathname} />
      </div>
    </div>
  );
}
