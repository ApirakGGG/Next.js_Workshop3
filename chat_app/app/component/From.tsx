"use client";
import React, { useRef, useState, useEffect } from "react";
import { PostData } from "../action/Post_Data";
import { FaRegPlusSquare, FaTimes } from "react-icons/fa";

const From = () => {
  // กำหนดRef อ้างอิงElement
  const fromRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null); //ใช้อิงถึงinput
  const [file, setFile] = useState<File | null>(null); // ใช้ state เพื่อติดตามไฟล์ที่เลือก
  const [message, setMessage] = useState(""); // ใช้ state เพื่อเก็บข้อความ
  const [preview, setPreview] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("preview") : null
  ); // เก็บ URL ของรูป preview

  //handleFileChang
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFile(file); // กำหนดค่าให้ state ถ้ามีการเลือกไฟล์
      setPreview(previewURL); // สร้าง URL สำหรับ preview
      localStorage.setItem("preview", previewURL);// เก็บ URL ไว้ใน Local Storage
    }
  };

  //handlesubmit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม

    const trimmedMessage = message.trim(); // ตรวจสอบข้อความและลบช่องว่าง

    // ตรวจสอบว่าไม่ได้พิมพ์ข้อความและไม่มีไฟล์
    if (!trimmedMessage && !file) {
      console.log("Error: Message or file is required.");
      return; // ถ้าไม่มีข้อความและไฟล์ ให้ไม่ทำการส่ง
    }

    const formData = new FormData();

    // ถ้ามีไฟล์เพิ่มเข้าไป
    if (file) {
      formData.append("image", file); // เพิ่มเฉพาะภาพ
    }

     // เพิ่มข้อความเฉพาะเมื่อมีข้อความที่ไม่ว่างเปล่า
     formData.append("message", trimmedMessage);

    // ส่งข้อมูลไปยัง API
    await PostData(formData);

    // reset ฟอร์มหลังจากส่งข้อมูล
    fromRef.current?.reset();
    setFile(null); // เคลียร์ไฟล์หลังจากส่ง
    setMessage(""); // เคลียร์ข้อความหลังจากส่ง
    setPreview(null); // ล้างรูป preview หลังจากส่ง
    localStorage.removeItem("preview"); // ลบ URL จาก Local Storage
  };

  const handleClick = () => {
    // เมื่อคลิกที่ไอคอน จะเปิด dialog เลือกไฟล์
    fileInput.current?.click();
  };

  // Remove Image input preview
  const handleRemoveImage = () => {
    setFile(null); // ล้างไฟล์
    setPreview(null); // ล้างรูป preview
    localStorage.removeItem("preview"); // ลบ URL จาก Local Storage
    fileInput.current!.value = ""; // รีเซ็ต input file
  };

  useEffect(() => {
    // ล้าง URL เมื่อ component ถูก unmount
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <>
      <form
        ref={fromRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data" // เพื่อรองรับการส่งไฟล์
        className="p-6 fixed bottom-0 left-0 w-full bg-white "
      >
        <div className="flex gap-2">
          {/* text input */}
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // จับค่าข้อความ
            style={{
              backgroundImage: preview ? `url(${preview})` : "none",
              backgroundSize: "contain",
              backgroundPosition: "start",
            }}
            className={`flex-grow py-2 px-4 outline-none rounded-lg border-2 border-blue-300
              ${preview ? "h-32 bg-no-repeat rounded-lg " : ""}
              `}
          />
          {/* Cancel Image */}
          {preview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute rounded-full border-2 bg-white transform "
            >
              <FaTimes />
            </button>
          )}

          {/* image input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            className="py-2 px-4 outline-none rounded-lg items-center"
            ref={fileInput} // อ้างอิงถึงไฟล์ input
            onChange={handleFileChange} // จับค่าข้อความ
            style={{ display: "none" }} //ซ่อน input
          />
          <FaRegPlusSquare
            onClick={handleClick}
            className=" w-8 h-8 items-center justify-center cursor-pointer text-sky-500 hover:text-sky-700"
          />

          {/* send button */}
          <button
            type="submit"
            className="bg-sky-300 hover:bg-sky-400 rounded-lg min-w-[10vh]"
          >
            send
          </button>
        </div>
      </form>
    </>
  );
};

export default From;
