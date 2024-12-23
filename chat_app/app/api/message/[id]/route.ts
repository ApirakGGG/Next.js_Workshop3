"use server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher"; 

export async function DELETE(req: Request, context: { params: { id: string } }) {
  // รอ params ให้เสร็จก่อนใช้งาน
  const { id } = await context.params; // ใช้ await เพื่อรอ params

  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID is required" },
      { status: 400 }
    );
  }

  // pusher configuration
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "ap1",
    useTLS: true,
  });

  try {
    // ลบข้อความใน DB
    const message = await prisma.message.delete({
      where: { id },
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
