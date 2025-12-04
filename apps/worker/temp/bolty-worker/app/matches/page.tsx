"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { loadLikedProfiles } from "../../lib/storage";
import type { Profile } from "../../types";

export default function MatchesPage() {
  const [likes, setLikes] = useState<Profile[]>([]);

  useEffect(() => {
    setLikes(loadLikedProfiles());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Matches</h2>
        {likes.length === 0 ? (
          <p className="text-gray-500">
            No matches yet — swipe right to like someone.
          </p>
        ) : (
          <div className="grid gap-4">
            {likes.map((p) => (
              <div
                key={p.id}
                className="match-item flex items-center gap-4 p-4 bg-white rounded shadow"
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">
                    {p.name}, {p.age}
                  </div>
                  <p className="text-sm text-gray-600">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}