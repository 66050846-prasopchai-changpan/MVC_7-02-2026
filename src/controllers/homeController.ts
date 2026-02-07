import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
  res.render("pages/home", {
    title: "MVC TypeScript Starter",
    now: new Date().toLocaleString()
  });
};
