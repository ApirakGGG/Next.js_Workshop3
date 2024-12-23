import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

//Prisma client
const prisma = new PrismaClient();

// config Auth provider
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), // เชื่อมต่อกับ Prisma Adapter
  providers: [
    // ใช้ github provider เพื่อlogin
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string, // client
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, //secret
    }),
    //Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, //client
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string //secret
    })
  ],
};
