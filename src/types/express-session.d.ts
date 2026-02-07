import "express-session";
import { SessionUser } from "../middlewares/auth";

// เพิ่ม type ให้ session เก็บ user ได้แบบปลอดภัย
declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}
