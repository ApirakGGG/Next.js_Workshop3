import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com","ubkihvizqemmpqimfyct.supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ปิดการทำงานของ ESLint ในระหว่าง build
  },
};

export default nextConfig;
