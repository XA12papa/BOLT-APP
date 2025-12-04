import { NextResponse } from "next/server";
import type { Profile } from "@/types";
import { store } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, direction, profile } = body as {
      id: string;
      direction: "left" | "right";
      profile: Profile;
    };

    let match = false;
    if (direction === "right") {
      // simulate the other person liking back ~40% of the time
      match = Math.random() < 0.4;
      if (match) {
        store.matches.unshift(profile);
      }
    }

    return NextResponse.json({ match });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}