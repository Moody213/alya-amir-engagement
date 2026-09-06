import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets phones/other devices on the LAN load the dev server (e.g. via
  // `http://192.168.x.x:3000`). Without this, Next.js blocks the dev-only
  // HMR/runtime requests from any origin other than localhost, which breaks
  // client-side hydration entirely (page loads, but nothing is interactive).
  allowedDevOrigins: ["192.168.1.52"],
};

export default nextConfig;
