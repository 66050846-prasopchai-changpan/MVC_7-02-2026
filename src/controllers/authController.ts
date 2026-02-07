import { Request, Response } from "express";
import { getAllUsers, getUserByCredentials } from "../models/userModel";

export const loginPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  const error = typeof req.query.error === "string" ? req.query.error : null;
  res.render("pages/login", { title: "เข้าสู่ระบบ", users, error });
};

export const login = async (req: Request, res: Response) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "").trim();
  const user = await getUserByCredentials(username, password);

  if (!user) {
    res.redirect("/login?error=invalid");
    return;
  }

  req.session.user = { id: user.id, name: user.name, role: user.role };

  if (user.role === "reviewer") {
    res.redirect("/reviewer");
  } else {
    res.redirect("/user/rumours");
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
