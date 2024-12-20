"use client";

import { signIn, signOut } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

//Logout function
export function Logout() {
  return (
    //ใช้ next-auth/react เพื่อให้สามารถใช้งาน signOut ในการออกจากระบบ
    <button
      onClick={() => signOut()}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-400 px-8 py-3 text-center text-sm
        font-semibold text-white ring-red-300 transition duration-300 hover:bg-blue-700 md:text-base"
    >
      Logout
    </button>
  );
}

//login function
export function Login() {
  return (
    //ใช้ next-auth/react เพื่อให้สามารถใช้งาน github provider ในการ login
    <button
      onClick={() => signIn("github")}
      className="flex items-center justify-center gap-2 rounded-lg bg-green-400 px-8 py-3 text-center text-sm
          font-semibold text-white ring-red-300 transition duration-300 hover:bg-green-700 md:text-base"
    >
      Login
    </button>
  );
}

export function MainLogin() {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* Github */}
        <div>
          {/* //ใช้ next-auth/react เพื่อให้สามารถใช้งาน github provider ในการ login */}
          <button
            onClick={() => signIn("github")}
            className="flex w-full border-2 items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-center text-sm
      font-semibold text-black ring-red-300 transition duration-300 hover:bg-green-300 md:text-base"
          >
            <FaGithub className="h-5 w-5" />
            Login With GitHub
          </button>
        </div>
        {/* Google */}
        <div className="mt-3">
          <button
            onClick={() => signIn("google")}
            className="flex w-full border-2 items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-center text-sm
      font-semibold text-black ring-red-300 transition duration-300 hover:bg-blue-300 md:text-base"
          >
            <FaGoogle className="h-5 w-5" />
            LOGIN WITH GOOGLE
          </button>
          ;
        </div>
      </div>
    </>
  );
}
