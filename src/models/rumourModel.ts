import { dbPromise } from "../db";

export type RumourRow = {
  id: number;
  title: string;
  source: string;
  created_at: string;
  credibility_score: number;
  status: "normal" | "panic";
  verified_status: "unverified" | "true" | "false";
  report_count?: number;
};

// ดึงข่าวทั้งหมดพร้อมนับจำนวนรายงาน
export const getAllRumours = async (): Promise<RumourRow[]> => {
  const db = await dbPromise;
  const sql = `
    SELECT r.*, COUNT(rep.id) AS report_count
    FROM rumour r
    LEFT JOIN report rep ON rep.rumour_id = r.id
    GROUP BY r.id
    ORDER BY report_count DESC, r.created_at DESC
  `;
  return (await db.all(sql)) as RumourRow[];
};

// ดึงข่าวลือรายตัว (ใช้ในหน้า detail)
export const getRumourById = async (
  id: number
): Promise<RumourRow | undefined> => {
  const db = await dbPromise;
  const sql = `
    SELECT r.*, COUNT(rep.id) AS report_count
    FROM rumour r
    LEFT JOIN report rep ON rep.rumour_id = r.id
    WHERE r.id = ?
    GROUP BY r.id
  `;
  return (await db.get(sql, id)) as RumourRow | undefined;
};

// ดึงเฉพาะข่าวที่เป็น panic
export const getPanicRumours = async (): Promise<RumourRow[]> => {
  const db = await dbPromise;
  const sql = `
    SELECT r.*, COUNT(rep.id) AS report_count
    FROM rumour r
    LEFT JOIN report rep ON rep.rumour_id = r.id
    WHERE r.status = 'panic'
    GROUP BY r.id
    ORDER BY report_count DESC
  `;
  return (await db.all(sql)) as RumourRow[];
};

// ดึงข่าวที่มีผลตรวจสอบแล้ว (จริง/เท็จ)
export const getVerifiedRumours = () => {
  const sql = `
    SELECT r.*, COUNT(rep.id) AS report_count
    FROM rumour r
    LEFT JOIN report rep ON rep.rumour_id = r.id
    WHERE r.verified_status IN ('true', 'false')
    GROUP BY r.id
    ORDER BY r.verified_status, report_count DESC
  `;
  return dbPromise.then((db) => db.all(sql) as Promise<RumourRow[]>);
};

// เปลี่ยนสถานะข่าวเป็น normal/panic
export const setRumourStatus = async (
  id: number,
  status: "normal" | "panic"
) => {
  const db = await dbPromise;
  await db.run(`UPDATE rumour SET status = ? WHERE id = ?`, status, id);
};

// ผู้ตรวจสอบยืนยันว่าเป็นจริง/เท็จ
export const setVerifiedStatus = async (
  id: number,
  verifiedStatus: "true" | "false"
) => {
  const db = await dbPromise;
  await db.run(
    `UPDATE rumour SET verified_status = ? WHERE id = ?`,
    verifiedStatus,
    id
  );
};
