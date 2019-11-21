const BASE_CONFIG = require('../config')
const redis = require('../database/redis')
const errorCode = require('../utils/errorCode')
const Response = require('../utils/response')

const check = async (ctx, next) => {
  let token = ctx.request.headers.token
  const ignorePath = [
    /^\/api\/nkm-admin\/?$/,
    // /^\/api\/nkm-admin\/registered$/,
    /^\/api\/nkm-admin\/login$/,
    /^\/api\/nkm-admin\/captcha(\?.*)?$/
  ]
  if (ignorePath.findIndex(v => v.test(ctx.url)) !== -1) {
    return next()
  } else {
    // 判断是否有token
    if (!token) {
      ctx.body = new Response(false, errorCode.noToken)
      return ctx
    }

    try {
      let { token: isExists, apiList, isAdmin } = await redis.hgetall(`user:${token}`)
      redis.expire(`user:${token}`, BASE_CONFIG.redis.expire)
      // 判断用户是否有合法的token
      if (!isExists) {
        ctx.body = new Response(false, errorCode.loginExpired)
      } else {
        // 判断是否有请求接口权限
        if (apiList.findIndex(v => v === ctx.path) === -1 && !isAdmin) {
          ctx.body = new Response(false, errorCode.noPermission)
        } else {
          return next()
        }
      }
    } catch (error) {
      ctx.body = new Response(false, errorCode.loginExpired)
    }
  }
}

module.exports = check
