import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default {
  extends: [
    ...compat.extends("next/core-web-vitals"), // ใช้แยกเป็น array
    ...compat.extends("next/typescript"),
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off", // ตัวอย่างการปิด rule
  },
};
