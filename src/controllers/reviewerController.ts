import { Request, Response } from "express";
import {
  getAllRumours,
  getRumourById,
  getVerifiedRumours,
  setVerifiedStatus
} from "../models/rumourModel";
import { getReportsByRumourId } from "../models/reportModel";

// หน้า dashboard ผู้ตรวจสอบ
export const reviewerDashboard = async (req: Request, res: Response) => {
  const rumours = await getAllRumours();
  const verifiedRumours = await getVerifiedRumours();

  res.render("pages/reviewer", {
    title: "หน้าผู้ตรวจสอบ",
    rumours,
    verifiedRumours
  });
};

// ผู้ตรวจสอบยืนยันข่าวจริง/เท็จ
export const verifyRumour = async (req: Request, res: Response) => {
  const rumourId = Number(req.params.id);
  const status = req.body.status as "true" | "false";

  const rumour = await getRumourById(rumourId);
  if (!rumour) {
    res.status(404).render("pages/404", { title: "Not Found" });
    return;
  }

  if (status !== "true" && status !== "false") {
    res.redirect("/reviewer");
    return;
  }

  await setVerifiedStatus(rumourId, status);
  res.redirect(`/reviewer/rumours/${rumourId}`);
};

// หน้า detail ของผู้ตรวจสอบ (ดูรายงานและยืนยันผล)
export const reviewerDetail = async (req: Request, res: Response) => {
  const rumourId = Number(req.params.id);
  const rumour = await getRumourById(rumourId);
  if (!rumour) {
    res.status(404).render("pages/404", { title: "Not Found" });
    return;
  }

  const reports = await getReportsByRumourId(rumourId);
  res.render("pages/reviewer-detail", {
    title: "ตรวจสอบข่าวลือ",
    rumour,
    reports
  });
};
