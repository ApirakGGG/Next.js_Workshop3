"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pusher from "pusher-js";

// interface types
interface ChatProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
  }[]; // กำหนด type เป็น Array เพื่อใช้กับ .map
}

const PostChat = ({ data }: ChatProps) => {
  // send props to component
  const [totalComments, setTotalComments] = useState(data);
  // กำหนดref เพื่อนำไปอ้างอิง element
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //Pusher Configuration
    let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap1",
    });

    let chanel = pusher.subscribe("my-channel");
    chanel.bind("my-event", function (data: any) {
      const parseComments = JSON.parse(data.message);
      //settotalcomment
      setTotalComments((prev) => [...prev, parseComments]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  // scroll to bottom
  const scrollToBottom = () => {
    //เพื่อทำให้เลื่อนsmooth
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    /*
     * ใช้ useEffect เพื่อเรียก scrollToBottom ทุกครั้งที่ค่า totalComments เปลี่ยน
     * ทำให้เมื่อมีคอมเมนต์ใหม่ ระบบจะเลื่อนหน้าจอไปยังตำแหน่งด้านล่างอัตโนมัติ
     */
    scrollToBottom();
  }, [totalComments]);

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, index) => (
          <div key={index} className="flex items-center">
            {/* Profiles image */}
            <Image
              src={message.User.image as string}
              alt="Profiles image"
              width={35}
              height={35}
              className="rounded-full object-cover mr-4"
            />
            <p className="min-w-[7vh] border-2 border-slate-300 rounded-xl shadow-md px-2 py-1 font-semibold self-start">
              {/* message */}
              {message.message}{" "}
            </p>
            <p className="font-light text-sm text-slate-500 px-4">
              {/* Username */}
              send by : <span>{message.User.name}</span>
            </p>
          </div>
        ))}
        {/* อ้างอิงจากref */}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
};

export default PostChat;
