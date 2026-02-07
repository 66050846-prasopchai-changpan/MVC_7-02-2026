import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

const dbPath = path.join(process.cwd(), "data", "rumour.db");

export const dbPromise: Promise<Database> = open({
  filename: dbPath,
  driver: sqlite3.Database
});

export const REPORT_THRESHOLD = 3;
