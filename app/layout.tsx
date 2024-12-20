import type { Metadata } from "next";
import { Syne, DM_Sans, Archivo } from "next/font/google";
import { NextProvider } from "@/providers/NextProvider";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";

import { Toaster } from "@/components/ui/sonner";

const syne = Syne({ subsets: ["latin"], variable: "--syne" });
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--dm-sans" });
const archivo = Archivo({ subsets: ["latin"], variable: "--archivo" });

export const metadata: Metadata = {
  title: "Fastrack",
  description: "Manage Your Finances with Fastrack",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dm_sans.variable} ${archivo.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <NextAuthProvider session={session}>
          <ReactQueryProvider>
            <NextProvider>{children}</NextProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
