import "express-session";
import { SessionUser } from "../middlewares/auth";

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}
