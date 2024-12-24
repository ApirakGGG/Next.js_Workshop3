"use server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher";

// function Method PATCH = update
export async function PATCH(req: Request, params: Promise<{ id: string }>) {
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
    // อ่านข้อความที่ต้องการแก้ไขจาก Body
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Update Message
    const updatedMessage = await prisma?.message.update({
      where: { id },
      data: { message },
    });

    // แจ้ง Pusher เพื่ออัปเดต UI ของทุกคน
    await pusher.trigger("my-channel", "edit-message", {
      id,
      message: updatedMessage.message,
    });

    // ส่งผลลัพธ์กลับไปยัง client
    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (e) {
    console.error("Error Edit Message", e);
    return NextResponse.json(
      { success: false, error: "Failed to edit message" },
      { status: 500 }
    );
  }
}
