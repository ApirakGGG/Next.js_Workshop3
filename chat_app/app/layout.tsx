import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./component/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { Login } from "./component/Button";
import ToggleModal from "./component/ToggleModal";

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //ตรวจสอบและดึงข้อมูล session ของผู้ใช้
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {/* ทำให้ components สามารถเข้าถึงข้อมูล session authentication
         ผ่าน context ของ NextAuth ได้ */}
        <NextAuthProvider>
          <nav className="flex px-10 py-5 justify-between fixed top-0 left-0 w-full bg-white">
            <h1 className="text-3xl text-black font-bold">
              APP <span className="text-green-500">CHAT</span>
            </h1>

            {/* ตรวจสอบsession ถ้ามีให้แสดงProfiles ถ้าไม่มีแสดง Button SignIn */}
            {session ? (
              <div className="flex items-center gap-3">
                {/* profiles user เมื่อมีการ SignIn */}
                <Image
                  src={session.user?.image as string}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                {/* profiles name */}
                <p className="">{session.user?.name}</p>
                {/* Toggle */}
                <ToggleModal />
              </div>
            ) : (
              // เมื่อไม่มี session แสดง Login button
              <Login />
            )}
          </nav>
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
