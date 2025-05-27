export default {
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
  },
  // 数据库配置
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  // JWT 配置
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}
