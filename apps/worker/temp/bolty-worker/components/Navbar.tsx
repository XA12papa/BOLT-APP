"use client";

import Link from "next/link";

type Props = {
  matchesCount: number;
};

export default function Navbar({ matchesCount }: Props) {
  return (
    <header className="nav">
      <h1 className="logo">Tinder Clone</h1>
      <nav>
        <Link href="/matches" className="nav-link">
          Matches ({matchesCount})
        </Link>
      </nav>
    </header>
  );
}