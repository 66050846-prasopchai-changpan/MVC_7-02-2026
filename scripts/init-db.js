const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "rumour.db");
const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");
const seedPath = path.join(__dirname, "..", "sql", "seed.sql");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

(async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  const seedSql = fs.readFileSync(seedPath, "utf-8");

  await db.exec(schemaSql);
  await db.exec(seedSql);
  await db.close();

  console.log(`Database initialized at ${dbPath}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
