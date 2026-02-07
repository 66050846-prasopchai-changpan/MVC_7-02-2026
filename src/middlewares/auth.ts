import { Request, Response, NextFunction } from "express";

export type SessionUser = {
  id: number;
  name: string;
  role: "user" | "reviewer";
};

// กันหน้าไว้ ถ้าไม่ login ให้ไปหน้า /login
export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }
  next();
};

// กันหน้าตาม role เช่น user/reviewer
export const requireRole = (role: SessionUser["role"]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }
    if (req.session.user.role !== role) {
      res.status(403).render("pages/403", { title: "Forbidden" });
      return;
    }
    next();
  };
};
