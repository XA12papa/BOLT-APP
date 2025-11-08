import { promises as fs } from "fs";
import path from "path";

export type User = {
  id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
};

type Like = {
  from: string;
  to: string;
};

type Match = {
  id: string;
  participants: string[];
};

type DB = {
  users: User[];
  likes: Like[];
  matches: Match[];
};

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function readDB(): Promise<DB> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as DB;
}

export async function writeDB(db: DB): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}
  