PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS rumour;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'reviewer')),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE rumour (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL,
  credibility_score INTEGER NOT NULL CHECK (credibility_score BETWEEN 0 AND 100),
  status TEXT NOT NULL CHECK (status IN ('normal', 'panic')),
  verified_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verified_status IN ('unverified', 'true', 'false'))
);

CREATE TABLE report (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reporter_id INTEGER NOT NULL,
  rumour_id INTEGER NOT NULL,
  reported_at TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('distortion', 'incitement', 'false_info')),
  UNIQUE (reporter_id, rumour_id),
  FOREIGN KEY (reporter_id) REFERENCES users(id),
  FOREIGN KEY (rumour_id) REFERENCES rumour(id)
);
