import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SideBar from "@/components/serenity/SideBar";
import Navbar from "@/components/serenity/Navbar";
import { Spotlight } from "@/components/ui/spotlight";

const poppin = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppin.className}`}>
      <div className="hidden md:flex">
        <Spotlight fill="gray"/>
      </div>
      
        <Navbar/>
        <div className="flex">
            <SideBar/>
            <div className="bg-black w-full">
              {children}
            </div>
        </div>
    </div>
  );
}
