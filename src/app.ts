import express from "express";
import path from "path";
import session from "express-session";
import indexRouter from "./routes/index";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// ตั้งค่า template engine และโฟลเดอร์ views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// รองรับรับข้อมูลจากฟอร์ม/JSON และเสิร์ฟไฟล์ static
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// session แบบง่ายเพื่อจำลอง login
app.use(
  session({
    secret: "rumour-tracker-secret",
    resave: false,
    saveUninitialized: false
  })
);

// ส่ง user ที่ login ไว้ไปให้ทุก view ใช้แสดงบน navbar
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// รวม routes หลักของระบบ
app.use("/", indexRouter);

// หน้าไม่พบ
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
