import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth";

//สร้าง hanler เพ่ื่อจัดการ req
//รวมการตั้งค่าจาก (authOptions) เข้ากับระบบของ NextAuth
const hanler = NextAuth(authOptions); 

//กำหนดให้ handler รองรับทั้งคำขอแบบ GET และ POST
export {hanler as GET, hanler as POST}; 