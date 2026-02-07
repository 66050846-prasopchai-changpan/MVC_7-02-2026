import { Request, Response, NextFunction } from "express";

export type SessionUser = {
  id: number;
  name: string;
  role: "user" | "reviewer";
};

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }
  next();
};

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
