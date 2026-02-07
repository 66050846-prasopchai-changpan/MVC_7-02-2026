import { dbPromise } from "../db";

export type UserRow = {
  id: number;
  name: string;
  role: "user" | "reviewer";
  username: string;
  password: string;
};

export const getAllUsers = async (): Promise<UserRow[]> => {
  const db = await dbPromise;
  return (await db.all(`SELECT * FROM users ORDER BY id`)) as UserRow[];
};

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
