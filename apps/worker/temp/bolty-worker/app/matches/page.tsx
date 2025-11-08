    "use client";

    import React, { useEffect, useState } from "react";
    import Link from "next/link";
    import type { Profile } from "@/lib/profiles";

    export default function MatchesPage(): JSX.Element {
      const [likes, setLikes] = useState<Profile[]>([]);

      useEffect(() => {
        try {
          const raw = localStorage.getItem("likes");
          setLikes(raw ? JSON.parse(raw) : []);
        } catch (e) {
          setLikes([]);
        }
      }, []);

      return (
        <div className="matches-page">
          <header className="header" style={{ marginBottom: 12 }}>
            <Link href="/">← Back</Link>
            <h2 style={{ margin: 0 }}>Matches</h2>
          </header>

          <main>
            {likes.length === 0 ? (
              <p>No matches yet. Swipe right to like someone!</p>
            ) : (
              <div className="matches-grid">
                {likes.map((p) => (
                  <div className="match-item" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div style={{ marginTop: 8 }}>
                      <strong>
                        {p.name}, {p.age}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      );
    }
  