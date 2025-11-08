    "use client";

    import React, { useEffect, useState } from "react";
    import TinderCard from "./TinderCard";
    import type { Profile } from "@/lib/profiles";

    type Props = {
      initialProfiles: Profile[];
    };

    export default function SwipeDeck({ initialProfiles }: Props): JSX.Element {
      const [people, setPeople] = useState<Profile[]>(initialProfiles);
      const [liked, setLiked] = useState<Profile[]>([]);
      const [swipeTrigger, setSwipeTrigger] = useState<{ id: string; dir: "left" | "right" } | null>(null);
      const [match, setMatch] = useState<Profile | null>(null);

      useEffect(() => {
        try {
          const raw = localStorage.getItem("likes");
          if (raw) setLiked(JSON.parse(raw));
        } catch (e) {
          // ignore
        }
      }, []);

      useEffect(() => {
        try {
          localStorage.setItem("likes", JSON.stringify(liked));
        } catch (e) {}
      }, [liked]);

      const handleSwipe = (dir: "left" | "right", profile: Profile) => {
        setPeople((prev) => prev.filter((p) => p.id !== profile.id));
        if (dir === "right") {
          setLiked((prev) => {
            const next = [...prev, profile];
            // simulate a match randomly
            if (Math.random() > 0.75) {
              setMatch(profile);
            }
            return next;
          });
        }
        setSwipeTrigger(null);
      };

      const triggerSwipe = (dir: "left" | "right") => {
        const top = people[people.length - 1];
        if (!top) return;
        setSwipeTrigger({ id: top.id, dir });
      };

      const reset = () => {
        setPeople(initialProfiles);
        setLiked([]);
        try {
          localStorage.removeItem("likes");
        } catch (e) {}
      };

      return (
        <div>
          <div className="deck" aria-live="polite">
            {people.length === 0 && (
              <div className="empty">
                <p>No more profiles</p>
                <button onClick={reset} className="btn">
                  Reset
                </button>
              </div>
            )}

            {people.map((p, idx) => (
              <TinderCard key={p.id} profile={p} index={idx} onSwipe={handleSwipe} swipeTrigger={swipeTrigger} />
            ))}
          </div>

          <div className="controls">
            <button className="btn nope" onClick={() => triggerSwipe("left")}>
              Nope
            </button>
            <button className="btn like" onClick={() => triggerSwipe("right")}>
              Like
            </button>
          </div>

          {match && (
            <div className="match-modal" role="dialog" aria-modal="true">
              <div className="match-card">
                <h2>It's a match!</h2>
                <img src={match.image} alt={match.name} />
                <p>
                  {match.name}, {match.age}
                </p>
                <button className="btn" onClick={() => setMatch(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  