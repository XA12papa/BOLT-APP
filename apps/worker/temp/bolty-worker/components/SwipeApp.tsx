    "use client";

    import React from "react";
    import Header from "./Header";
    import SwipeDeck from "./SwipeDeck";
    import profiles from "@/lib/profiles";

    export default function SwipeApp(): JSX.Element {
      return (
        <div className="app-container">
          <Header />
          <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SwipeDeck initialProfiles={profiles} />
          </main>
        </div>
      );
    }
  