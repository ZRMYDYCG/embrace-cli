import defaultConfig from './default.js'

export default {
  ...defaultConfig,
  // 可以添加生产环境的特定配置
  server: {
    ...defaultConfig.server,
    // 生产环境可能使用不同的端口
    port: process.env.PORT || 80,
  },
  database: {
    ...defaultConfig.database,
    // 生产环境可能使用不同的数据库
    name: 'my_database_prod',
  },
}
