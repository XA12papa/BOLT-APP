"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import type { Profile } from "@/types";

type Props = {
  profiles: Profile[];
  onSwipe: (profile: Profile, dir: "left" | "right") => void;
};

export default function Deck({ profiles, onSwipe }: Props) {
  const [cards, setCards] = useState<Profile[]>(profiles);
  const [forceDir, setForceDir] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    setCards(profiles);
  }, [profiles]);

  function handleCardSwipe(profile: Profile, direction: "left" | "right") {
    onSwipe(profile, direction);
    setCards((prev) => prev.filter((p) => p.id !== profile.id));
  }

  function triggerForce(direction: "left" | "right") {
    setForceDir(direction);
    // reset shortly after to allow subsequent forced swipes
    setTimeout(() => setForceDir(null), 50);
  }

  return (
    <div className="deck">
      {cards.length === 0 && <div className="empty">No more people nearby</div>}

      {cards.map((p, i) => (
        <Card
          key={p.id}
          profile={p}
          isTop={i === 0}
          forceDirection={i === 0 ? forceDir : null}
          onSwipe={(dir) => handleCardSwipe(p, dir)}
        />
      ))}

      <div className="controls">
        <button className="btn nope" onClick={() => triggerForce("left")}>
          Nope
        </button>
        <button className="btn like" onClick={() => triggerForce("right")}>
          Like
        </button>
      </div>
    </div>
  );
}