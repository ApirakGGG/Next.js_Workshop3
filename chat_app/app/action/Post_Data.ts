"use server";

import { prisma } from "../../lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { supabase } from "../../lib/supabaseClient";
import Pusher from "pusher";

export async function PostData(fromData: FormData) {
  "use server";


  // ดึงค่าจาก FormData ที่มีชื่อฟิลด์ message และเก็บไว้ในตัวแปร message
  const message = fromData.get("message") as string | null ; // ส่ง message
  const file = fromData.get("image") as File || null; // Uploaded image

  // ใช้ session อย่าลืม async await
  // ใช้ getServerSession เพื่อดึงข้อมูลเซสชันของผู้ใช้
  const session = await getServerSession(authOptions); // session
  console.log("Message:", message);

  let imageUrl: string | null = null ; // ค่าเริ่มต้นของ imageUrl

  // file send request
  if (file) {
    // ชื่อไฟล์ที่ไม่ซ้ำ
    const fileName = `${Date.now()} - ${file?.name}`;
    // อัปโหลดไฟล์ไปยัง Supabase Storage
    const { data, error } = await supabase.storage
      .from("ImageUploads")
      .upload(fileName, file, {
        contentType: file.type,
      });

    // URL สำหรับไฟล์ที่อัปโหลด
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_UR}https://ubkihvizqemmpqimfyct.supabase.co/storage/v1/s3${data?.path}`;
    console.log("ImageUpload:", imageUrl);

    // สร้างpublicUrl ของ Image ที่ upload
    const { data: publicImageUrl } = supabase.storage
      .from("ImageUploads")
      .getPublicUrl(fileName);
    console.log("PublicImageUrl:", publicImageUrl);

    if (publicImageUrl?.publicUrl) {
      // กำหนดค่า imageUrl เป็น Public URL
      imageUrl = publicImageUrl.publicUrl;
      console.log("PublicImageUrl:", imageUrl);

      //else
    } else {
      console.error("Error generating public URL for the image.");
    }

    if (error) {
      console.error("Error uploads images:", error);
    }
  }

  // method create message insert in DB
  // บันทึกข้อมูลลงในฐานข้อมูล Prisma
  const data = await prisma.message.create({ 
    data: {
      message: message || null , // message 
      email: session?.user?.email as string, // email 
      imageUrl: imageUrl || null, // image
    },
    /*
     * ดึงข้อมูลผู้ใช้เพิ่มเติม (ชื่อและรูปภาพ) ที่เกี่ยวข้องกับข้อความนี้กลับมาด้วย
     */
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // pusher configuration
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "ap1",
    useTLS: true,
  });

  await pusher.trigger("my-channel", "my-event", {
    message: `${JSON.stringify(data)}`,
  });
}
