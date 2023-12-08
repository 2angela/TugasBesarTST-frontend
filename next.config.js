/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  env: { API_URL: "http://virtualhoteltourservice.bug5gmc4dkc5g2d2.southeastasia.azurecontainer.io:8000"}
}

module.exports = nextConfig