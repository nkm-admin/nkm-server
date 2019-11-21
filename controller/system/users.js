const sql = require('../../database/mysql');
const redis = require('../../database/redis');
const Response = require('../../utils/response');
const errorCode = require('../../utils/errorCode');
const encrypt = require('../../utils/encrypt');

const list = async ctx => {
  try {
    let result = await sql(`
      SELECT
        id,
        user_login_name,
        display_name,
        user_email,
        user_status,
        avatar,
        user_registered,
        last_login_time,
        is_system_admin,
        role
      FROM nkm_users
      WHERE user_status <> 3
    `);
    let [{ count }] = await sql(`SELECT COUNT(*) count FROM nkm_users`);
    ctx.body = new Response(true, {
      data: result,
      count
    });
  } catch (error) {
    ctx.body = new Response(false, errorCode.queryUserListFail);
  }
  return ctx;
}

// 修改用户状态
const modifyStatus = async ctx => {
  // mark：  1 启用  2禁用  3删除
  const { id, mark, loginName } = ctx.request.body;
  const { id: currentId } = await redis.hgetall(`user:${ctx.headers.token}`);
  if (!id || !mark || !loginName) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    // 判断当前是否为用户自己
    if (id === currentId) {
      ctx.body = new Response(false, errorCode.isDelSelf);
      return ctx;
    }
    try {
      await sql(`
        UPDATE nkm_users
          SET user_status = ${mark}
          WHERE id = ${id}
          AND is_system_admin <> 1
          AND id <> ${currentId}
      `);

      // 判断是否是禁用用户或者删除用户并删除token
      if (mark === (2 || 3)) {
        const delToken = await redis.get(`loginName:${loginName}`);
        redis.del(`loginName:${loginName}`);
        redis.del(`user:${delToken}`);
      }
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

const resetPassword = async ctx => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    try {
      await sql(`
        UPDATE nkm_users
          SET user_password = '${encrypt.md5Slat('123456')}'
        WHERE id = ${id}
      `);
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

const allocationRole = async ctx => {
  const { id, role } = ctx.request.body;
  if (!id || !role) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    try {
      await sql(`
        UPDATE nkm_users
          SET role = '${role}'
        WHERE id = ${id}
      `);
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

module.exports = {
  list,
  modifyStatus,
  resetPassword,
  allocationRole
};
