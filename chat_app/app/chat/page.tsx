import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import From from "../components/From";

export default async function ChatPage() {
  const session = await getServerSession(authOptions); // เก็บsession

// ถ้าไม่มี session || redirect ไปหน้าHomepage
if (!session ) {
 redirect("/")
}

  return <>
  <div className="h-screen flex flex-col">
    {/* ส่วนของChat */}
    <From />
  </div>
  </>;
}
