const sql = require('../database/mysql');
const Response = require('../utils/response');
const errorCode = require('../utils/errorCode');
const encrypt = require('../utils/encrypt');

const registered = async ctx => {
  // 先查询并判断用户是否已经存在
  const isUsed = await sql(`
    SELECT user_login_name
    FROM nkm_users
    WHERE user_login_name = '${ctx.request.body.loginName}'
  `);
  if (isUsed.length) {
    ctx.body = new Response(false, errorCode.userRepeatRegistration);
  } else {
    try {
      let { loginName, password, displayName, email = '', role = '', avatar = '' } = ctx.request.body;
      if (!loginName || !password || !displayName) {
        ctx.body = new Response(false, errorCode.fail);
      } else {
        await sql(`
          INSERT INTO
          nkm_users (
            user_login_name,
            user_password,
            display_name,
            user_email,
            role,
            user_registered,
            last_login_time,
            avatar
          )
          VALUES(
            '${loginName}',
            '${encrypt.md5Slat(password)}',
            '${displayName}',
            '${email}',
            '${role}',
            ${Date.now()},
            ${Date.now()},
            '${avatar}'
          )
        `);

        ctx.body = new Response(true, {
          data: encrypt.md5Slat(loginName)
        });
      }
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

module.exports = registered;
