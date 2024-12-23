import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import From from "../component/From";
import PostChat from "../component/PostChat";
import { prisma } from "../../lib/db";


// get Data from DB
async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true, //select message
      id: true, //get id
      createdAt: true, // Time of created
      imageUrl: true, //get url image
      User: {
        select: {
          image: true, //get name
          name: true, //get image
        },
      },
    },
    orderBy: {
      createdAt: "asc", //get ข้อมูลตามเวลา 
    },
  });
// return
  return data;
}
//Add
export const dtnamic = "force-dynamic"

export default async function ChatPage() {
  const session = await getServerSession(authOptions); // เก็บsession
  // get data
  const data = await getData();
  // console.log("Data:", data);
  
  // ถ้าไม่มี session || redirect ไปหน้าHomepage
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* PostChat ส่ง Props */}
        <PostChat data={data as any} />
        {/* ส่วนของChat */}
        <From />
      </div>
    </>
  );
}
