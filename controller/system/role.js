const sql = require('../../database/mysql');
const redis = require('../../database/redis');
const Response = require('../../utils/response');
const errorCode = require('../../utils/errorCode');
const encrypt = require('../../utils/encrypt');

const save = async ctx => {
  const { id, name, code, ids } = ctx.request.body;
  if (!name || !code || !ids) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    try {
      if (!id) {
        await sql(`
          INSERT INTO role (name, code, permission, create_time)
          VALUES ('${name}', '${code}', '${ids}', ${Date.now()})
        `);
      } else {
        await sql(`
          UPDATE role
          SET name = '${name}', permission = '${ids}'
          WHERE id = ${id}
        `);
      }
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

const list = async ctx => {
  try {
    let data = await sql(`SELECT id, name, code, permission FROM role`);
    ctx.body = new Response(true, { data });
  } catch (error) {
    ctx.body = new Response(false, error);
  }
  return ctx;
}

const del = async ctx => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    try {
      const systemAdmin = await sql(`SELECT * FROM role WHERE id = ${id} AND code = 'systemAdministrator'`);
      if (systemAdmin.length) {
        ctx.body = new Response(false, errorCode.delRoleSystemAdmin);
      } else {
        await sql(`DELETE FROM role WHERE id = ${id} AND code <> 'systemAdministrator'`);
        ctx.body = new Response(true, errorCode.success);
      }
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

module.exports = {
  save,
  list,
  del
}
