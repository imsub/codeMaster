import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  allowedDevOrigins: ["192.168.29.221", "localhost"], // Add your specific IP
  experimental: {},
};

export default nextConfig;

// import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
// import type { NextConfig } from 'next';
// import type { NextConfigComplete } from 'next/dist/server/config-shared';

// interface ConfigContext {
//   defaultConfig: NextConfigComplete;
// }

// type ConfigFunction = (
//   phase: string,
//   context: ConfigContext
// ) => NextConfig | Promise<NextConfig>;

// const config: ConfigFunction = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       /* development only config options here */
//     }
//   }

//   return {
//     /* config options for all phases except development here */
//   }
// }

// export default config;
