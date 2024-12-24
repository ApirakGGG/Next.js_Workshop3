import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // ปิดการแจ้งเตือน unused variables
      "react/react-in-jsx-scope": "off", // สำหรับ React 17+
    },
  },
];
