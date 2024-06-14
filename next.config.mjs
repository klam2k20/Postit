/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "react-icons/*",
      "next-auth",
      "@auth/prisma-adapter",
      "@hookform/resolvers",
      "@prisma/client",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-icons",
      "@radix-ui/react-slot",
      "@types/bcryptjs",
      "bcryptjs",
      "react-hook-form",
      "resend",
    ],
  },
};

export default nextConfig;
