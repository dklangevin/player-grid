/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    dbConfig: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PW,
      // ssl: {
      //   rejectUnauthorized: false,
      //   key: fs.readFileSync('key.pem'),
      //   cert: fs.readFileSync('cert.pem'),
      // },
      ssl: true,
    },
  },
};

module.exports = nextConfig;
