const sql = require('../database/mysql')
const redis = require('../database/redis')
const Response = require('../utils/response')
const errorCode = require('../utils/errorCode')
const encrypt = require('../utils/encrypt')

const updateInfo = async ctx => {
  const { displayName, email } = ctx.request.body
  if (!displayName || !email) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      const { id } = await redis.hgetall(`user:${ctx.headers.token}`)
      await sql(`
        UPDATE nkm_users
          SET
            display_name = '${displayName}',
            user_email = '${email}'
        WHERE id = ${id}
      `)
      ctx.body = new Response(true, errorCode.success)
    } catch (error) {
      ctx.body = new Response(false, error)
    }
  }
}

const modifyPassword = async ctx => {
  const { password } = ctx.request.body
  if (!password) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      const { id } = await redis.hgetall(`user:${ctx.headers.token}`)
      await sql(`
        UPDATE nkm_users
          SET
            user_password = '${encrypt.md5Slat(password)}'
        WHERE id = ${id}
      `)
      ctx.body = new Response(true, errorCode.success)
    } catch (error) {
      ctx.body = new Response(false, error)
    }
  }
}

module.exports = {
  updateInfo,
  modifyPassword
}
