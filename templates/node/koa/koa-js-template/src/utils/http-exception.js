// 基础异常类
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 500) {
      super()
      this.msg = msg
      this.errorCode = errorCode
      this.code = code
    }
  }
  
  // 400 异常类，用于请求参数错误
  class ParameterException extends HttpException {
    constructor(msg = '参数错误', errorCode = 10001) {
      super(msg, errorCode, 400)
    }
  }
  
  // 404 异常类，用于资源未找到
  class NotFound extends HttpException {
    constructor(msg = '资源未找到', errorCode = 10002) {
      super(msg, errorCode, 404)
    }
  }
  
  // 401 异常类，用于未授权访问
  class AuthFailed extends HttpException {
    constructor(msg = '授权失败', errorCode = 10003) {
      super(msg, errorCode, 401)
    }
  }
  
  // 403 异常类，用于禁止访问
  class Forbidden extends HttpException {
    constructor(msg = '禁止访问', errorCode = 10004) {
      super(msg, errorCode, 403)
    }
  }
  
  module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbidden
}