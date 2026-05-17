import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config) => {
    // Permite o uso de 'debugger' no código sem que seja removido na produção
    config.devtool = "source-map";
  },
  turbopack: {}
};

export default nextConfig;