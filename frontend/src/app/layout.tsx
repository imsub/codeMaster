import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import { WebVitals } from './components/web-vitals';
//import { ModeToggle } from "@/components/deToggle";
import { ThemeProvider } from "../components/theme-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Duster",
  description:
    "Code Duster is a platform for building your problem-solving skills.",
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/favicon.ico",
  // },
  // openGraph: {
  //   title: "Code Duster",
  //   description: "Code Duster is a platform for building your problem-solving skills.",
  //   url: "https://codeduster.com",
  //   siteName: "Code Duster",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Code Duster",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Code Duster",
  //   description: "Code Duster is a platform for building your problem-solving skills.",
  //   images: ["/og-image.png"],
  //   creator: "@codeduster",
  // },
  // themeColor: "#000000",
  // appleWebApp: {
  //   capable: true,
  //   title: "Code Duster",
  //   statusBarStyle: "default",
  //   startupImage: [
  //     { url: "/apple-touch-startup-image.png" },
  //     { url: "/apple-touch-startup-image.png", media: "(device-width: 375px) and (device-height: 812px)" },
  //   ],
  // },
  // manifest: "/manifest.json",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   // maxSnippet: -1,
  //   // maxImagePreview: "large",
  //   // maxVideoPreview: -1,
  //   noarchive: true,
  //   nosnippet: false,
  //   notranslate: false,
  //   noimageindex: false,
  //   // noindex: false,
  //   // nofollow: false,
  //   // noydir: false,
  //   // noarchive: false,
  //   // noimageindex: false,
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        {/* <head>
          <link rel="manifest" href="../../public/manifest.json" />
        </head> */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <header>
              <ModeToggle />
            </header> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
