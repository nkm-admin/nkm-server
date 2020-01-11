const sql = require('../database/mysql')
const redis = require('../database/redis')
const Response = require('../utils/response')
const errorCode = require('../utils/errorCode')
const encrypt = require('../utils/encrypt')

const updateInfo = async ctx => {
  const { displayName, email, avatar } = ctx.request.body
  if (!displayName || !email) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      const { id, avatar: oldAvatar } = await redis.hgetall(`user:${ctx.headers.token}`)

      const oldAvatarName = oldAvatar.match(/\d+\.[a-z]+$/i)[0]
      const newAvatarName = avatar.match(/\d+\.[a-z]+$/i)[0]

      if (oldAvatarName !== newAvatarName) {
        // 记录不需要的图片
        await redis.origin.sadd('uploadDelList', oldAvatarName)

        // 更新图片信息
        const update = await redis.hget('upload', newAvatarName)
        update && await redis.hset('upload', newAvatarName, JSON.stringify({
          ...update,
          isUsed: true
        }))

        // 更新用户缓存中的图片
        await redis.hset(`user:${ctx.request.headers.token}`, 'avatar', avatar)
      }

      await sql(`
        UPDATE nkm_users
          SET
            display_name = '${displayName}',
            user_email = '${email}',
            avatar = '${avatar}'
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
