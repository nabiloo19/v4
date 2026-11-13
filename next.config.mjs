/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify sets SITE_NAME at build time; the content API uses it to build
  // deploy-preview links when GitHub statuses don't include one.
  env: { NETLIFY_SITE_NAME: process.env.SITE_NAME ?? '' },
};

export default nextConfig;
