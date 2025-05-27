import helmet from 'koa-helmet'
import serve from 'koa-static'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function koaCore(app) {
  // 安全中间件
  app.use(helmet())
  
  // 静态文件服务
  app.use(serve(path.join(__dirname, '../../public')))
}
