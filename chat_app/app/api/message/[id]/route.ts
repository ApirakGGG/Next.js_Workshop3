"use server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/*
 ** API Route (route.ts) ซึ่งถูกตั้งค่าไม่ถูกต้องใน Next.js 13+ (App Router)
 ** เพราะ API Route ของ Next.js ต้องการ Named Export สำหรับแต่ละ HTTP Method
 ** (เช่น GET, POST, DELETE เป็นต้น) และห้ามใช้ Default Export
 */

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const Pusher = require("pusher"); // import
  const { params } = context; // ดึงค่าจาก context
  const { id } = params; // รอให้ params.id โหลดค่าก่อน

  // pusher configuration
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap1",
    useTLS: true,
  });

  try {
    // ลบข้อความในDB
    const message = await prisma.message.delete({
      where: { id }, // รับ ID ของข้อความที่จะลบ
    });

    // แจ้ง Pusher เพื่ออัปเดต UI ของทุกคน
    await pusher.trigger("my-channel", "delete-message", {
      id,
    });

    // ส่ง response กลับ
    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
      data: message,
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    // ส่ง response error
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
