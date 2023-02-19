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
      ssl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/api/cron/teams',
        headers: [
          {
            key: 'Referer',
            value: 'https://www.nba.com',
          },
        ],
      },
      // {
      //   // matching all API routes
      //   source: '/api/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Credentials', value: 'true' },
      //     { key: 'Access-Control-Allow-Origin', value: '*' },
      //     {
      //       key: 'Access-Control-Allow-Methods',
      //       value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      //     },
      //     {
      //       key: 'Access-Control-Allow-Headers',
      //       value:
      //         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      //     },
      //   ],
      // },
    ];
  },
};

module.exports = nextConfig;
