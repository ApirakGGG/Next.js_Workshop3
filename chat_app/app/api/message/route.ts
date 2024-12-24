import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 ** API Route (route.ts) ซึ่งถูกตั้งค่าไม่ถูกต้องใน Next.js 13+ (App Router)
 ** เพราะ API Route ของ Next.js ต้องการ Named Export สำหรับแต่ละ HTTP Method
 ** (เช่น GET, POST, DELETE เป็นต้น) และห้ามใช้ Default Export
 */
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
