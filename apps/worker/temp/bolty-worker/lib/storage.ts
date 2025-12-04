import type { Profile } from "../types";

export function loadLikedProfiles(): Profile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("likedProfiles");
    return raw ? (JSON.parse(raw) as Profile[]) : [];
  } catch {
    return [];
  }
}

export function saveLikedProfiles(profiles: Profile[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("likedProfiles", JSON.stringify(profiles));
  } catch {}
}