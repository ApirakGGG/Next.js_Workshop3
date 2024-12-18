'use server'

import { prisma } from "../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export async function PostData(fromData: FormData) {
    'use server';

    // ดึงค่าจาก FormData ที่มีชื่อฟิลด์ message และเก็บไว้ในตัวแปร message
    const message = fromData.get('message'); // ส่ง message
    // ใช้ session อย่าลืม async await
    // ใช้ getServerSession เพื่อดึงข้อมูลเซสชันของผู้ใช้
    const session = await getServerSession(authOptions); // session

    console.log("Message:" ,message)
    // method create message insert in DB
    const data = await prisma.message.create({
        data: {
            message: message as string , // message คือข้อความที่ดึงมาจากฟอร์ม
            email: session?.user?.email as string, // email ใช้ดึงอีเมลของผู้ใช้จากเซสชัน
        },
        // {/*
        // ดึงข้อมูลผู้ใช้เพิ่มเติม (ชื่อและรูปภาพ) ที่เกี่ยวข้องกับข้อความนี้กลับมาด้วย
        // */}
        include : {
            User: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
}