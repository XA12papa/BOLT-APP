"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="header max-w-3xl mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">Tinder Clone</h1>
      <nav>
        <Link href="/" className="mr-4 text-sm text-gray-700 hover:underline">
          Home
        </Link>
        <Link
          href="/matches"
          className="text-sm text-pink-600 hover:underline"
        >
          Matches
        </Link>
      </nav>
    </header>
  );
}