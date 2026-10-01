# Construction Material Price Monitor

ระบบกลางสำหรับสำรวจ ติดตาม และเปรียบเทียบราคาวัสดุก่อสร้างจากหลายแหล่งสำคัญในประเทศไทย

## เป้าหมาย
- เก็บข้อมูลสินค้าแบบมาตรฐานกลาง โดยไม่ผูกกับร้านใดร้านหนึ่ง
- เก็บราคาปัจจุบันและประวัติราคาแยกตามแหล่ง
- เปรียบเทียบราคาสินค้าเดียวกันข้ามร้าน
- ติดตามการเปลี่ยนแปลงราคา โปรโมชั่น และสถานะสินค้า
- รองรับการเพิ่มแหล่งข้อมูลใหม่ได้ง่าย

## แหล่งข้อมูลเป้าหมาย
เริ่มจาก:
- DoHome

ออกแบบไว้ให้เพิ่ม:
- HomePro
- Thai Watsadu
- Global House
- ร้านวัสดุก่อสร้างออนไลน์อื่น ๆ

## โครงสร้างข้อมูลหลัก
1. products — สินค้ากลาง
2. sources — แหล่งข้อมูล/ร้านค้า
3. listings — รายการสินค้าของแต่ละร้าน
4. price_history — ประวัติราคา
5. crawl_logs — ประวัติการดึงข้อมูล

## แนวทางระบบ
- Frontend/Dashboard: Next.js
- Database: Supabase (PostgreSQL)
- Hosting: Vercel
- Scheduler: GitHub Actions
- Data collection: source adapters แยกตามร้าน

## หลักการเก็บข้อมูล
ระบบจะเก็บ SKU, ชื่อสินค้า, แบรนด์, หมวดหมู่, หน่วยขาย, รายละเอียด, specification, URL, รูปภาพ, ราคาปัจจุบัน, ราคาปกติ/โปรโมชั่น, สถานะสินค้า และวันเวลาที่ตรวจสอบ

> หมายเหตุ: การเก็บข้อมูลจากเว็บไซต์ควรเคารพ robots.txt, terms of service, rate limits และไม่พยายามหลบ CAPTCHA หรือระบบป้องกันการใช้งานอัตโนมัติ


## สถานะล่าสุด
- Supabase production schema: พร้อมใช้งาน
- Sources: DoHome, HomePro, Thai Watsadu, Global House
- DoHome product parser: implemented (JSON-LD first + HTML fallback)
- Price history schema: พร้อมใช้งาน
- Multi-source adapters: scaffolded
- ขั้นถัดไป: server-side runner + deployment secrets + scheduled checks
