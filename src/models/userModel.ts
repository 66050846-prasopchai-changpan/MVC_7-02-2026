import { dbPromise } from "../db";

export type UserRow = {
  id: number;
  name: string;
  role: "user" | "reviewer";
  username: string;
  password: string;
};

// ดึงผู้ใช้ทั้งหมด (ใช้แสดงในหน้า login)
export const getAllUsers = async (): Promise<UserRow[]> => {
  const db = await dbPromise;
  return (await db.all(`SELECT * FROM users ORDER BY id`)) as UserRow[];
};

// ตรวจสอบ username/password
export const getUserByCredentials = async (
  username: string,
  password: string
): Promise<UserRow | undefined> => {
  const db = await dbPromise;
  return (await db.get(
    `SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1`,
    username,
    password
  )) as UserRow | undefined;
};
