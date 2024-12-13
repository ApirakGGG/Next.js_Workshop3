"use client";

import { signIn, signOut } from "next-auth/react";

//Logout function
export function Logout() {
  return (
    //ใช้ next-auth/react เพื่อให้สามารถใช้งาน signOut ในการออกจากระบบ
    <button onClick={() => signOut()}
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
        <button onClick={() => signIn("github")}
        className="flex items-center justify-center gap-2 rounded-lg bg-green-400 px-8 py-3 text-center text-sm
          font-semibold text-white ring-red-300 transition duration-300 hover:bg-green-700 md:text-base"
      >
        Login
      </button>
    )
}