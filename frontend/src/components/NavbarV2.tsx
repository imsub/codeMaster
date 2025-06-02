"use client";

//import { ModeToggle } from "@/components/shared/mode-toggle";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
//import { Code } from 'lucide-react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import img from "../../public/3logo.png";
import Image from "next/image";
// import { Radius } from "lucide-react";
const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname?.startsWith(path) || pathname === path;

  const isActiveClass = (path: string) =>
    isActive(path)
      ? "text-indigo-400 border-1 px-2 py-1 rounded-md transition-all ease-in"
      : "text-gray-400";

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          {/* <Code className="h-6 w-6 text-primary" /> */}
          <Image
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          style={{borderRadius:"10px"}}
            loading="lazy"
            src={img}
            width={45}
            height={45}
            quality={80}
            alt="Logo for code Duster"
          />
          <span className="text-xl font-bold">
            Code <span style={{ color: "#00D6C4" }}>Duster</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/problems"
            className={cn(
              "text-sm font-medium hover:text-teal-400 transition-colors",
              isActiveClass("/problems")
            )}
          >
            Problems
          </Link>
          <Link
            href="/contest"
            className={cn(
              "text-sm font-medium hover:text-teal-400 transition-colors",
              isActiveClass("/contest")
            )}
          >
            Contest
          </Link>
          <Link
            href="/discuss"
            className={cn(
              "text-sm font-medium hover:text-teal-400 transition-colors",
              isActiveClass("/discuss")
            )}
          >
            Discuss
          </Link>
          <Link
            href="/interview"
            className={cn(
              "text-sm font-medium hover:text-teal-400 transition-colors",
              isActiveClass("/interview")
            )}
          >
            Interview
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
