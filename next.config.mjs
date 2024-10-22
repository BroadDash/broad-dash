import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./env/server.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
  },
};

export default nextConfig;
