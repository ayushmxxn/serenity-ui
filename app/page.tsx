"use client";
import React from "react";
import { GeistSans } from "geist/font";
import Hero from "@/components/serenity/Hero";
import HomeNav from "@/components/serenity/HomeNav";
import FAQ from "@/components/serenity/FAQ";
import InstallationPage from "@/components/serenity/InstallationPage";

function Home() {
  return (
    <div className={`${GeistSans.className} `}>
      <div className="px-5 pt-4">
        <HomeNav />
        <Hero />
      </div>
      <InstallationPage />
      <FAQ />
    </div>
  );
}

export default React.memo(Home);
