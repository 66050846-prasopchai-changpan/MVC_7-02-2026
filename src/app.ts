import express from "express";
import path from "path";
import session from "express-session";
import indexRouter from "./routes/index";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  session({
    secret: "rumour-tracker-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
