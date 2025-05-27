export function success(ctx, data = null, message = 'success') {
    ctx.body = {
      code: 0,
      message,
      data
    }
  }
  
  export function error(ctx, code = 500, message = 'Internal Server Error') {
    ctx.status = code
    ctx.body = {
      code,
      message
    }
  }