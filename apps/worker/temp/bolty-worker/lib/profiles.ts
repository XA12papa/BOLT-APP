import type { Profile } from "../types";

const NAMES = [
  "Alex",
  "Sam",
  "Taylor",
  "Jordan",
  "Casey",
  "Jamie",
  "Morgan",
  "Riley",
  "Cameron",
  "Drew",
  "Quinn",
  "Avery",
  "Parker",
  "Rowan",
];

const BIOS = [
  "Love hiking and coffee.",
  "Software engineer who loves dogs.",
  "Artist and music fan.",
  "Traveler, foodie, and yogi.",
  "Netflix and chill enthusiast.",
  "Gym rat and weekend cook.",
  "Bookworm and plant parent.",
];

export function getSampleProfiles(count = 10): Profile[] {
  const profiles: Profile[] = [];
  for (let i = 0; i < count; i++) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const age = 20 + Math.floor(Math.random() * 15);
    const avatarId = Math.floor(Math.random() * 70) + 1;
    const avatar = `https://i.pravatar.cc/500?img=${avatarId}`;
    const bio = BIOS[Math.floor(Math.random() * BIOS.length)];
    profiles.push({ id, name, age, bio, avatar });
  }
  return profiles;
}