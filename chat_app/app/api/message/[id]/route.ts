"use server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher";

// ฟังก์ชัน DELETE ที่ใช้ dynamic parameter
export async function DELETE(req: Request, params: Promise<{ id: string }>) {
  const { id } = await params;
  // ตั้งค่า Pusher
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "ap1",
    useTLS: true,
  });

  try {
    // ลบข้อความจากฐานข้อมูล
    const message = await prisma?.message.delete({
      where: { id },
    });

    // แจ้ง Pusher เพื่ออัปเดต UI ของทุกคน
    await pusher.trigger("my-channel", "delete-message", {
      id,
    });

    // ส่งผลลัพธ์กลับ
    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
      data: message,
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    // ส่งข้อผิดพลาดกลับ
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
