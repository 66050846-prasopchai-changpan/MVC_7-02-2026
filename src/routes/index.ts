import { Router } from "express";
import { login, loginPage, logout } from "../controllers/authController";
import { homePage } from "../controllers/homeController";
import {
  reviewerDashboard,
  reviewerDetail,
  verifyRumour
} from "../controllers/reviewerController";
import {
  createReport,
  listRumours,
  rumourDetail,
  summaryPage
} from "../controllers/rumourController";
import { requireLogin, requireRole } from "../middlewares/auth";

const router = Router();

// หน้าเริ่มต้น
router.get("/", homePage);

// ระบบ login แบบง่าย
router.get("/login", loginPage);
router.post("/login", login);
router.post("/logout", logout);

// หน้าผู้ใช้ทั่วไป (รายงานข่าว)
router.get("/user/rumours", requireRole("user"), listRumours);
router.get("/user/rumours/:id", requireRole("user"), rumourDetail);
router.post(
  "/user/rumours/:id/reports",
  requireRole("user"),
  createReport
);

// หน้าสรุปผล (ดูได้ทุก role)
router.get("/summary", summaryPage);

// หน้าผู้ตรวจสอบ (ยืนยันข่าวจริง/เท็จ)
router.get("/reviewer", requireRole("reviewer"), reviewerDashboard);
router.get("/reviewer/rumours/:id", requireRole("reviewer"), reviewerDetail);
router.post(
  "/reviewer/rumours/:id/verify",
  requireRole("reviewer"),
  verifyRumour
);

export default router;
