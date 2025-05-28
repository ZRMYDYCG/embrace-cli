import { 
    HttpException,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbidden
  } from '../utils/http-exception.js'

  import { error } from '../utils/response.js'
  
export default async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 处理自定义异常
      if (err instanceof HttpException) {
        ctx.status = err.code
        error(ctx, err.code, err.msg)
      } else {
        // 处理未知异常
        ctx.status = 500;
        error(ctx, 500, '服务器内部错误')
      }
      // 打印错误日志，方便调试
      console.error(err)
    }
  }