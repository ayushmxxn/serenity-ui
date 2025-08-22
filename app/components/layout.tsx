import type { Metadata } from "next";
import SideBar from "@/components/serenity/SideBar";
import { ToastProvider } from "./toast/components/Toast";
import Navbar from "@/components/serenity/Navbar";

export const metadata: Metadata = {
  title: "Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      <div>
        <div className="hidden md:flex"></div>
        <div className="">
          <Navbar />
        </div>
        <div className="flex">
          <div className="">
            <SideBar />
          </div>
          <div className="bg-neutral-950 w-full rounded-2xl">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
