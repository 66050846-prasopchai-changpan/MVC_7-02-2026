import { Request, Response } from "express";
import {
  getAllRumours,
  getPanicRumours,
  getRumourById,
  getVerifiedRumours
} from "../models/rumourModel";
import { addReport, getReportsByRumourId } from "../models/reportModel";

export const listRumours = async (req: Request, res: Response) => {
  const rumours = await getAllRumours();
  res.render("pages/rumours-list", {
    title: "หน้ารวมข่าวลือ (ผู้ใช้ทั่วไป)",
    rumours
  });
};

export const rumourDetail = async (req: Request, res: Response) => {
  const rumourId = Number(req.params.id);
  const rumour = await getRumourById(rumourId);
  if (!rumour) {
    res.status(404).render("pages/404", { title: "Not Found" });
    return;
  }

  const reports = await getReportsByRumourId(rumourId);
  const error = typeof req.query.error === "string" ? req.query.error : null;

  res.render("pages/rumours-detail", {
    title: "รายละเอียดข่าวลือ",
    rumour,
    reports,
    error
  });
};

export const summaryPage = async (req: Request, res: Response) => {
  const panicRumours = await getPanicRumours();
  const verifiedRumours = await getVerifiedRumours();

  res.render("pages/summary", {
    title: "หน้าสรุปผล",
    panicRumours,
    verifiedRumours
  });
};

export const createReport = async (req: Request, res: Response) => {
  const rumourId = Number(req.params.id);
  const reportType = req.body.reportType as
    | "distortion"
    | "incitement"
    | "false_info";

  try {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }
    await addReport({
      reporterId: req.session.user.id,
      rumourId,
      reportType
    });
    res.redirect(`/user/rumours/${rumourId}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
    res.redirect(
      `/user/rumours/${rumourId}?error=${encodeURIComponent(message)}`
    );
  }
};
