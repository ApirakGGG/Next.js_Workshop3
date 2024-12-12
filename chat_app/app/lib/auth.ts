import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
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
  ],
};
