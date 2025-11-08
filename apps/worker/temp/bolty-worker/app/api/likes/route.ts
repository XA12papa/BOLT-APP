import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from, to } = body ?? {};
    if (!from || !to) {
      return NextResponse.json({ error: "from and to are required" }, { status: 400 });
    }

    const db = await readDB();

    const exists = db.likes.some((l) => l.from === from && l.to === to);
    if (!exists) {
      db.likes.push({ from, to });
    }

    // Check for reciprocal like -> match
    const reciprocal = db.likes.find((l) => l.from === to && l.to === from);
    if (reciprocal) {
      const alreadyMatched = db.matches.some(
        (m) => m.participants.includes(from) && m.participants.includes(to)
      );
      if (!alreadyMatched) {
        const id = Date.now().toString(36);
        db.matches.push({ id, participants: [from, to] });
      }
      await writeDB(db);
      return NextResponse.json({ match: true });
    }

    await writeDB(db);
    return NextResponse.json({ match: false });
  } catch (err) {
    return NextResponse.json({ error: "Failed to record like" }, { status: 500 });
  }
}
  