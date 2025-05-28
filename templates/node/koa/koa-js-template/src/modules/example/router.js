import Router from 'koa-router'
import { success } from '../../utils/response.js'

const router = new Router({
  prefix: '/example'
})

// 示例
router.get('/', async (ctx) => {
  success(ctx, { message: '这是 example 模块的根路由' })
})

export default router