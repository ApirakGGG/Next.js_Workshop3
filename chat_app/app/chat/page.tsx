import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import From from "../components/From";
import PostChat from "../components/PostChat";
import { prisma } from "../lib/db";


// get message from DB
async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true, //select message
      id: true, //get id
      createdAt: true,
      User: {
        select: {
          image: true, //get name
          name: true, //get image
        },
      },
    },
    orderBy: {
      createdAt: "asc", //get createdAt
    },
    take: 50,
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
        {/* PostChat */}
        <PostChat data={data as any} />
        {/* ส่วนของChat */}
        <From />
      </div>
    </>
  );
}
