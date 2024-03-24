import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event App",
  description: "A chingu app by team 20",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col items-center justify-between gap-2",
          "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}