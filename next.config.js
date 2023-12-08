/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  env: { API_URL: "http://virtualhoteltourservices.c4aaf6hnfxhhbtb5.southeastasia.azurecontainer.io:8000"}
}

module.exports = nextConfig