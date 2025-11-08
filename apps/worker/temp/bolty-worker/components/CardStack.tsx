    "use client";

    import React, { useEffect, useState } from "react";
    import Card from "./Card";
    import MatchModal from "./MatchModal";
    import MatchesPanel from "./MatchesPanel";
    import type { Profile } from "../lib/types";

    export default function CardStack() {
      const [profiles, setProfiles] = useState<Profile[]>([]);
      const [matches, setMatches] = useState<Profile[]>([]);
      const [showMatches, setShowMatches] = useState(false);
      const [currentMatch, setCurrentMatch] = useState<Profile | null>(null);

      useEffect(() => {
        let mounted = true;
        async function load() {
          try {
            const res = await fetch("/api/profiles");
            const data = await res.json();
            if (mounted) setProfiles(data);
          } catch (err) {
            console.error(err);
          }
        }
        load();
        try {
          const saved = localStorage.getItem("tinder_matches");
          if (saved) setMatches(JSON.parse(saved));
        } catch {
          //
        }
        return () => {
          mounted = false;
        };
      }, []);

      useEffect(() => {
        try {
          localStorage.setItem("tinder_matches", JSON.stringify(matches));
        } catch {
          //
        }
      }, [matches]);

      const handleSwipe = (dir: "left" | "right", profile: Profile) => {
        setProfiles((prev) => prev.filter((p) => p.id !== profile.id));

        if (dir === "right") {
          // simulate other person liking back ~35% chance
          const matched = Math.random() < 0.35;
          if (matched) {
            setMatches((m) => [profile, ...m]);
            setCurrentMatch(profile);
          }
        }
      };

      const topProfiles = profiles.slice(0, 3);

      return (
        <>
          <div className="header">
            <div className="app-title">Tinder Clone</div>
            <div className="controls">
              <button className="btn" onClick={() => setShowMatches((s) => !s)}>Matches ({matches.length})</button>
            </div>
          </div>

          <div className="card-stack" aria-live="polite">
            {topProfiles.length === 0 && <div style={{ textAlign: "center", padding: 20 }}>No more profiles</div>}
            {topProfiles.map((p, i) => (
              <Card key={p.id} profile={p} index={i} onSwipe={handleSwipe} />
            ))}
          </div>

          <div className="controls" style={{ marginTop: 20, justifyContent: "center" }}>
            <button
              className="btn btn--dislike"
              onClick={() => {
                const top = profiles[0];
                if (!top) return;
                handleSwipe("left", top);
              }}
              aria-label="Dislike"
            >
              ✖
            </button>

            <button
              className="btn btn--like"
              onClick={() => {
                const top = profiles[0];
                if (!top) return;
                handleSwipe("right", top);
              }}
              aria-label="Like"
            >
              ❤
            </button>
          </div>

          {currentMatch && <MatchModal profile={currentMatch} onClose={() => setCurrentMatch(null)} />}
          {showMatches && <MatchesPanel matches={matches} onClose={() => setShowMatches(false)} />}
        </>
      );
    }