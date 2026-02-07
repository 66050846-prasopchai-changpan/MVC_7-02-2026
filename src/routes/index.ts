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

router.get("/", homePage);
router.get("/login", loginPage);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user/rumours", requireRole("user"), listRumours);
router.get("/user/rumours/:id", requireRole("user"), rumourDetail);
router.post(
  "/user/rumours/:id/reports",
  requireRole("user"),
  createReport
);
router.get("/summary", summaryPage);
router.get("/reviewer", requireRole("reviewer"), reviewerDashboard);
router.get("/reviewer/rumours/:id", requireRole("reviewer"), reviewerDetail);
router.post(
  "/reviewer/rumours/:id/verify",
  requireRole("reviewer"),
  verifyRumour
);

export default router;
