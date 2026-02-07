import { dbPromise, REPORT_THRESHOLD } from "../db";
import { getRumourById, setRumourStatus } from "./rumourModel";

export type ReportRow = {
  id: number;
  reporter_id: number;
  rumour_id: number;
  reported_at: string;
  report_type: "distortion" | "incitement" | "false_info";
  reporter_name?: string;
  reporter_role?: "user" | "reviewer";
};

export const getReportsByRumourId = async (
  rumourId: number
): Promise<ReportRow[]> => {
  const db = await dbPromise;
  const sql = `
    SELECT rep.*, u.name AS reporter_name, u.role AS reporter_role
    FROM report rep
    JOIN users u ON u.id = rep.reporter_id
    WHERE rep.rumour_id = ?
    ORDER BY rep.reported_at DESC
  `;
  return (await db.all(sql, rumourId)) as ReportRow[];
};

export const addReport = (params: {
  reporterId: number;
  rumourId: number;
  reportType: "distortion" | "incitement" | "false_info";
}) => {
  return (async () => {
    const db = await dbPromise;
    const rumour = await getRumourById(params.rumourId);
    if (!rumour) {
      throw new Error("ไม่พบข่าวลือที่ต้องการรายงาน");
    }

    if (rumour.verified_status !== "unverified") {
      throw new Error("ข่าวลือนี้ถูกตรวจสอบแล้ว จึงไม่สามารถรายงานเพิ่มได้");
    }

    const exists = await db.get(
      `SELECT 1 FROM report WHERE reporter_id = ? AND rumour_id = ? LIMIT 1`,
      params.reporterId,
      params.rumourId
    );
    if (exists) {
      throw new Error("ผู้ใช้รายนี้ได้รายงานข่าวลือนี้ไปแล้ว");
    }

    await db.run(
      `INSERT INTO report (reporter_id, rumour_id, reported_at, report_type)
       VALUES (?, ?, datetime('now', 'localtime'), ?)`,
      params.reporterId,
      params.rumourId,
      params.reportType
    );

    const row = (await db.get(
      `SELECT COUNT(*) AS count FROM report WHERE rumour_id = ?`,
      params.rumourId
    )) as { count: number };
    if (row.count >= REPORT_THRESHOLD) {
      await setRumourStatus(params.rumourId, "panic");
    }
  })();
};
