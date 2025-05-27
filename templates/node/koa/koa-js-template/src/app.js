import Koa from 'koa'
import { koaCore } from './core/koa-core.js'
import { loadMiddlewares } from './core/loader.js'
import { loadConfig } from '../config/index.js'
import { moduleRouters } from './modules/index.js'

const app = new Koa()

// 加载不同环境下的配置
const config = loadConfig()

// 核心扩展
koaCore(app)

// 自动加载中间件
loadMiddlewares(app)

// 使用模块路由
moduleRouters.forEach(moduleRouter => {
  app.use(moduleRouter.routes());
  app.use(moduleRouter.allowedMethods());
})

// 启动服务器
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`)
})

export default app
