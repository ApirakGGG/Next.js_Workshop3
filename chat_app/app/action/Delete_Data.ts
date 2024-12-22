'use server'

import {prisma} from "../lib/db"

export async function DeleteMessage(messageId : string, userEmail : string) {
    'use server'
 // ตรวจสอบว่าข้อความเป็นของผู้ใช้คนที่ส่งเท่านั้น
const message = await prisma.message.findUnique({
    where: {
        id: messageId
    }
})

//delete message
await prisma.message.delete({
    where: {
        id: messageId
    }
})

//  Pusher
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap1",
  useTLS: true,
});

pusher.trigger("my-channel", "message-deleted", {
  messageId, // ส่ง ID ของข้อความที่ถูกลบ
});
}