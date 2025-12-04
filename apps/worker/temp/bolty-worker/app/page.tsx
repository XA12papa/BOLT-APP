import Header from "../components/Header";
import CardStack from "../components/CardStack";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#080808] dark:to-[#0a0a0a]">
      <Header />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <CardStack />
      </div>
    </main>
  );
}