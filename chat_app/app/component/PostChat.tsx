"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import { FilePath } from "tailwindcss/types/config";
import { DialogDemo } from "./DialogDemo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

// interface types
interface ChatProps {
  data: {
    id: string;
    User: {
      image: string | null;
      name: string | null;
    };
    message: string | null;
    imageUrl: string | null;
    createdAt: string;
  }[]; // กำหนด type เป็น Array เพื่อใช้กับ .map
}

export default function PostChat({ data }: ChatProps) {
  // send props to component
  const [totalComments, setTotalComments] = useState(data);
  // กำหนดref เพื่อนำไปอ้างอิง element
  const messageEndRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession(); // get session
  const currentUser = session?.user?.name || ""; // เช็คsession

  console.log("CurrentUser:", currentUser);

  const router = useRouter();

  useEffect(() => {
    //Pusher Configuration
    let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap1",
    });

    let chanel = pusher.subscribe("my-channel");
    chanel.bind("my-event", function (data: any) {
      const parseComments = JSON.parse(data.message);
      // ตรวจสอบว่าข้อความซ้ำหรือไม่ ก่อนที่จะเพิ่มข้อมูล
      setTotalComments((prev) => {
        // ห้ามทำซ้ำ
        const isDuplicate = prev.some(
          (msg) => msg.createdAt === parseComments.createdAt
        );
        if (isDuplicate) {
          return prev;
        }
        return [...prev, parseComments];
      });
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

  const deleteMessage = useCallback(
    async (id: string) => {
      axios.delete(`/api/message/${id}`)
      .then((res) => {
        console.log("Deleted message successfully");
        router.refresh();
      });
      // update ค่าเมื่อลบ message
      setTotalComments((prev) => prev.filter((message) => message.id !== id));
    },
    [router]
  );

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, index) => {
          //ตรวจสอบข้อความว่ามากจากsession ไหน
          const isCurrentUser = message.User.name === currentUser;
          const timeStamp = message.createdAt
            ? new Date(message.createdAt)
                // แปลง createdAt เป็นเวลาแบบ HH:MM AM/PM
                .toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
            : "invalid time"; // ตรวจสอบ createdAt

          return (
            <div
              key={index}
              className={`flex items-center
                // เช็ค session
            ${
              isCurrentUser
                ? //  ถ้าsession เป็นของตัวเองให้ย้ายไปอยู่ฝั่งขวา
                  "flex-row-reverse"
                : // ถ้าใช่อยู่เหมือนเดิม
                  "flex-row"
            }
            `}
            >
              {/* Profiles image */}
              <Image
                src={message.User.image as string}
                alt="Profiles image"
                width={35}
                height={35}
                className="rounded-full object-cover mx-4"
              />
              {/* message & time */}
              <div
                className={`flex flex-col
                  ${
                    isCurrentUser
                      ? // ฝั่ง session
                        "items-end"
                      : // อีกฝั่ง
                        "items-start"
                  }
                  `}
              >
                {/* image upload */}
                <div className="flex flex-col">
                  {/* message && images uploads */}
                  <p
                    className={`min-w-[7vh] border-2 border-slate-300 rounded-xl shadow-md px-2 py-1 font-semibold self-start
                ${
                  isCurrentUser
                    ? // ถ้าเป็น session ฝั่งตัวเอง ให้ bg-blue
                      "bg-blue-300 text-black self-end"
                    : // ถ้าไม่ใช่ session ฝั่งตัวเอง ให้ bg-gray
                      "bg-gray-300 text-black self-start"
                }
                `}
                  >
                    {message.message}
                  </p>
                  {/* images uploads */}
                  {message.imageUrl && (
                    <Image
                      src={message.imageUrl as FilePath}
                      alt="image uploads"
                      className="mt-1.5 object-contain rounded-lg border-gray-200"
                      width={300}
                      height={200}
                    />
                  )}
                  {/* ปุ่มลบข้อความ (เฉพาะเจ้าของข้อความ) */}
                  {isCurrentUser && (
                    <div className="relative">
                      <DialogDemo
                        messageId={message.id}
                        deleteMessage={deleteMessage}
                      />
                    </div>
                  )}
                </div>

                {/* Time to send message */}
                <div className="text-xs text-gray-500 mt-2 mr-2">
                  {timeStamp}
                </div>
              </div>
              {/* Username */}
              {!isCurrentUser && (
                <p className="font-light text-sm text-slate-500 px-4">
                  send by : <span>{message.User.name}</span>
                </p>
              )}
            </div>
          );
        })}
        {/* อ้างอิงจากref */}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
