#66050846 นายประสพชัย ช่างปั้น 

ระบบติดตามข่าวลือบนสื่อสังคมออนไลน์ MVC - ข้อ 1

## รายละเอียดโปรเจค
โปรเจคนี้เป็นส่วนหนึ่งของการทำข้อสอบข้อที่ 1 โดยมีเป้าหมายเพื่อพัฒนาระบบติดตามข่าวลือบนสื่อสังคมออนไลน์
(Rumor Tracking System) ด้วยรูปแบบ MVC (Model-View-Controller) โดยใช้ Express.js และ TypeScript

## Front-end & Back-end
- Backend: Node.js + Express.js + TypeScript
- Template Engine: EJS
- Database: SQLite
- Session Management: express-session
- Authentication: ระบบล็อกอินแบบ user/pass (จำลอง)

## โครงสร้าง MVC
### Model
- `src/models/rumourModel.ts` จัดการข่าวลือ
- `src/models/reportModel.ts` จัดการการรายงานข่าว
- `src/models/userModel.ts` จัดการผู้ใช้งาน

### View
- หน้าผู้ใช้ทั่วไป: `views/pages/rumours-list.ejs`, `views/pages/rumours-detail.ejs`
- หน้าผู้ตรวจสอบ: `views/pages/reviewer.ejs`, `views/pages/reviewer-detail.ejs`
- หน้าสรุปผล: `views/pages/summary.ejs`
- หน้า Login: `views/pages/login.ejs`

### Controller
- `src/controllers/authController.ts` จัดการ login/logout
- `src/controllers/rumourController.ts` จัดการข่าวลือและการรายงาน (ฝั่งผู้ใช้)
- `src/controllers/reviewerController.ts` จัดการการตรวจสอบข่าวลือ (ฝั่งผู้ตรวจสอบ)

## ข้อมูลตัวอย่าง
- ข่าวลือ ≥ 8 ข่าว
- ผู้ใช้งาน ≥ 10 คน
- มีทั้งข่าวที่เข้าสู่ panic และไม่เข้าสู่ panic

## Business Rules ที่ตรวจสอบ
- ผู้ใช้หนึ่งคนรายงานข่าวเดิมซ้ำไม่ได้
- รายงานถึงเกณฑ์ (≥ 3) เปลี่ยนสถานะเป็น `panic`
- ข่าวที่ถูกตรวจสอบแล้วรายงานเพิ่มไม่ได้
- สถานะต้องสะท้อนในหน้าสรุปผล

## ข้อมูลการเข้าสู่ระบบ (ตัวอย่าง)
- ผู้ใช้ทั่วไป: `alice / 1234`, `bob / 1234`, ...
- ผู้ตรวจสอบ: `jane / 1234`

## คำสั่งใช้งาน
```bash
npm install
npm run db:setup
npm run dev
```
เปิดที่ http://localhost:3000
เข้าสู่ระบบ: http://localhost:3000/login

## โครงฐานข้อมูล
- schema: `sql/schema.sql`
- seed: `sql/seed.sql`
- db file: `data/rumour.db` (ไม่ถูก push ขึ้น GitHub)
