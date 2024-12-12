"use client";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

/*
 * ReactNode: ใช้กำหนดประเภทของ children เพื่อรองรับเนื้อหา React  ที่อยู่ภายใน Component นี้
 * SessionProvider: เป็น Component จาก next-auth/react ที่ใช้สำหรับจัดการและเผยแพร่ (provide) 
   ข้อมูล session ให้กับลูก Component ที่อยู่ในโครงสร้าง 
*/
export const NextAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* ใช้ SessionProvider เพื่อห่อ children ทั้งหมด
             จัดการสถานะของ session ผู้ใช้
        */}
      {/*         
        ช่วยให้ Component สามารถเข้าถึงข้อมูล session ผ่าน hooks
         เช่น useSession() หรือ getSession() ได้ง่าย
        */}

      <SessionProvider>{children}</SessionProvider>
    </>

    /*
        สร้าง (wrapper) สำหรับการจัดการ session authentication ใน
        App โดยช่วยให้ข้อมูลการยืนยันตัวตนพร้อมใช้งานในโครงสร้างของ React Component 
        ทั้งหมดที่อยู่ภายใน NextAuthProvider.
        */
  );
};
