import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { NextProvider } from "@/providers/NextProvider";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { TabSwitchProvider } from "@/contex/TabSwitchProvider";

const syne = Syne({ subsets: ["latin"], variable: "--syne" });
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--dm-sans" });

export const metadata: Metadata = {
  title: "Kudizen",
  description: "Manage Your Finances with Kudizen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${syne.variable} ${dm_sans.variable}`}>
      <body suppressHydrationWarning={true}>
        <NextAuthProvider session={session}>
          <ReactQueryProvider>
            <TabSwitchProvider>
              <NextProvider>{children}</NextProvider>
            </TabSwitchProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
