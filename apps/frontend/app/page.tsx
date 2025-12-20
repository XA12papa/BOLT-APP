"use client";
import AppBar from "@/components/AppBar";
import HomePage from "@/components/HomePage";
import Sidesbar from "@/components/Sidesbar";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";
export default function Home() {
  
  return (
      <div className="Home_page h-screen w-screen flex flex-col items-center justify-center relative" >
          <AppBar />

          <HomePage/>   

      </div>

  );
}
