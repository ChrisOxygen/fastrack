/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

// const nextConfig = {
//   serverExternalPackages: ["mongoose"],
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       config.externals = [...config.externals, "mongoose"];
//     }
//     config.experiments = {
//       topLevelAwait: true,
//       layers: true,
//     };
//     return config;
//   },
// };

export default nextConfig;
