import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".agents/**",
      "docs/**",
      "*.js",
    ],
  },
  ...nextConfig,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;
