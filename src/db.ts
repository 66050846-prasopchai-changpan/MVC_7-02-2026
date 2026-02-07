import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// ไฟล์ฐานข้อมูล SQLite จะอยู่ในโฟลเดอร์ data
const dbPath = path.join(process.cwd(), "data", "rumour.db");

// เปิดการเชื่อมต่อฐานข้อมูลแบบ async
export const dbPromise: Promise<Database> = open({
  filename: dbPath,
  driver: sqlite3.Database
});

// เกณฑ์จำนวนรายงานที่ทำให้ข่าวเป็น panic
export const REPORT_THRESHOLD = 3;
