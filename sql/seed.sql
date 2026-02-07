PRAGMA foreign_keys = ON;

-- ผู้ใช้งานตัวอย่าง (ใช้สำหรับ login)
INSERT INTO users (name, role, username, password) VALUES
  ('อลิซ', 'user', 'alice', '1234'),
  ('บ๊อบ', 'user', 'bob', '1234'),
  ('ชาลี', 'user', 'charlie', '1234'),
  ('ดวงดาว', 'user', 'dawndao', '1234'),
  ('เอก', 'user', 'ake', '1234'),
  ('เฟิร์น', 'user', 'fern', '1234'),
  ('กานต์', 'user', 'kant', '1234'),
  ('ฮารุ', 'user', 'haru', '1234'),
  ('อิงค์', 'user', 'ink', '1234'),
  ('เจน', 'reviewer', 'jane', '1234');

-- ข่าวลือตัวอย่าง (อย่างน้อย 8 ข่าว)
INSERT INTO rumour (id, title, source, created_at, credibility_score, status, verified_status) VALUES
  (12345678, 'ข่าวน้ำท่วมในเขต A', 'โซเชียล', '2026-02-01', 40, 'normal', 'unverified'),
  (23456789, 'ไฟไหม้ตลาดกลางคืน', 'ไลน์กลุ่ม', '2026-02-02', 25, 'panic', 'unverified'),
  (34567891, 'อาหารปนเปื้อนในโรงอาหาร', 'เฟซบุ๊ก', '2026-02-03', 60, 'normal', 'true'),
  (45678912, 'สะพานถล่ม', 'ทวิตเตอร์', '2026-02-03', 20, 'panic', 'false'),
  (56789123, 'ฝนตกหนักผิดฤดูกาล', 'ข่าวท้องถิ่น', '2026-02-04', 55, 'normal', 'unverified'),
  (67891234, 'ไฟดับทั่วเขต B', 'เฟซบุ๊ก', '2026-02-04', 30, 'panic', 'unverified'),
  (78912345, 'สารเคมีรั่วไหล', 'ข่าวทีวี', '2026-02-05', 75, 'normal', 'unverified'),
  (89123456, 'ระบบรถไฟขัดข้อง', 'ทวิตเตอร์', '2026-02-05', 50, 'normal', 'unverified');

-- รายงานตัวอย่าง
INSERT INTO report (reporter_id, rumour_id, reported_at, report_type) VALUES
  (1, 23456789, '2026-02-02 09:30', 'incitement'),
  (2, 23456789, '2026-02-02 10:00', 'false_info'),
  (3, 23456789, '2026-02-02 10:15', 'distortion'),
  (4, 67891234, '2026-02-04 08:10', 'false_info'),
  (5, 67891234, '2026-02-04 08:20', 'incitement'),
  (6, 67891234, '2026-02-04 08:40', 'distortion'),
  (7, 45678912, '2026-02-03 12:00', 'false_info');
