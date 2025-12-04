"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import type { Profile } from "../types";
import { getSampleProfiles } from "../lib/profiles";
import { loadLikedProfiles, saveLikedProfiles } from "../lib/storage";

export default function CardStack() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [liked, setLiked] = useState<Profile[]>([]);

  useEffect(() => {
    setProfiles(getSampleProfiles(8));
    setLiked(loadLikedProfiles());
  }, []);

  const handleSwipe = (id: string, dir: "left" | "right") => {
    setProfiles((prev) => {
      const swiped = prev.find((p) => p.id === id);
      const rest = prev.filter((p) => p.id !== id);
      if (dir === "right" && swiped) {
        setLiked((prevLikes) => {
          const next = [...prevLikes, swiped];
          saveLikedProfiles(next);
          return next;
        });
      }
      if (rest.length <= 3) {
        setTimeout(() => {
          setProfiles((cur) => [...cur, ...getSampleProfiles(5)]);
        }, 400);
      }
      return rest;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="card-stack">
        {profiles
          .slice(0, 5)
          .reverse()
          .map((profile, index) => {
            const isTop = index === 0;
            return (
              <Card
                key={profile.id}
                profile={profile}
                onSwipe={handleSwipe}
                isTop={isTop}
              />
            );
          })}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Swipe right to like, left to pass</p>
      </div>
    </div>
  );
}