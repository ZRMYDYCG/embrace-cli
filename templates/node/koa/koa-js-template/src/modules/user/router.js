import Router from 'koa-router'
import { success } from '../../utils/response.js'

const router = new Router({
  prefix: '/user'
})

// 示例
router.get('/', async (ctx) => {
  success(ctx, { message: '这是 user 模块的根路由' })
})

export default router