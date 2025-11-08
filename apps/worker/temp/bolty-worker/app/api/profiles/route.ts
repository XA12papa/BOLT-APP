    import { NextResponse } from "next/server";
    import fs from "fs/promises";
    import path from "path";

    export async function GET() {
      try {
        const file = path.join(process.cwd(), "data", "profiles.json");
        const content = await fs.readFile(file, "utf8");
        const profiles = JSON.parse(content);
        return NextResponse.json(profiles);
      } catch (err) {
        return NextResponse.json({ error: "Could not load profiles" }, { status: 500 });
      }
    }