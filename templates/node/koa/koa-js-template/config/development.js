import defaultConfig from './default.js'

export default {
  ...defaultConfig,
  // 可以添加开发环境的特定配置
  database: {
    ...defaultConfig.database,
    // 开发环境可能使用不同的数据库
    name: 'my_database_dev',
  },
}
