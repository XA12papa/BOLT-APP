    "use client";

    import React from "react";
    import Link from "next/link";

    export default function Header(): JSX.Element {
      return (
        <header className="header">
          <h1>Tinder Clone</h1>
          <nav>
            <Link href="/matches">Matches</Link>
          </nav>
        </header>
      );
    }
  