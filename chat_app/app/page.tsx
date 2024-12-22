import Image from "next/image";
import { CiLogin } from "react-icons/ci";
import { MainLogin } from "./component/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions); // เก็บsession

  // ถ้ามี session || redirect ไปหน้าChatpage
  if (session) {
    redirect("/chat");
  }

  return (
    <>
      {/* Login For Chat */}
      <div className="border-2 mx-auto max-w-xl rounded-lg mt-96 p-10">
        <h1 className="text-center text-4xl font-extrabold text-slate-500">
          LOGIN FOR USE CHAT
        </h1>
        <div className="flex justify-center items-center mt-5 gap-2">
          <MainLogin />
        </div>
      </div>
    </>
  );
}
