import type { Metadata } from "next";
import Navbar from "@/components/serenity/Navbar";
import SideBar from "@/components/serenity/SideBar";
import { Spotlight } from "@/components/ui/spotlight";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      <div className="hidden md:flex">
        <Spotlight fill="gray"/>
      </div>
        <Navbar/>
        <div className="flex">
            <SideBar/>
            <main className="bg-black flex-grow w-full">
              {children}
            </main>
        </div>
    </div>
  );
}
