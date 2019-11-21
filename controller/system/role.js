const sql = require('../../database/mysql')
const Response = require('../../utils/response')
const errorCode = require('../../utils/errorCode')

const save = async ctx => {
  const { id, name, code, ids } = ctx.request.body
  if (!name || !code || !ids) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      if (!id) {
        await sql(`
          INSERT INTO nkm_role (name, code, permission, create_time)
          VALUES ('${name}', '${code}', '${ids}', ${Date.now()})
        `)
      } else {
        await sql(`
          UPDATE nkm_role
          SET name = '${name}', permission = '${ids}'
          WHERE id = ${id}
        `)
      }
      ctx.body = new Response(true, errorCode.success)
    } catch (error) {
      ctx.body = new Response(false, error)
    }
  }
  return ctx
}

const list = async ctx => {
  try {
    let data = await sql(`SELECT id, name, code, permission FROM nkm_role`)
    ctx.body = new Response(true, { data })
  } catch (error) {
    ctx.body = new Response(false, error)
  }
  return ctx
}

const del = async ctx => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      const systemAdmin = await sql(`SELECT * FROM nkm_role WHERE id = ${id} AND code = 'systemAdministrator'`)
      if (systemAdmin.length) {
        ctx.body = new Response(false, errorCode.delRoleSystemAdmin)
      } else {
        await sql(`DELETE FROM nkm_role WHERE id = ${id} AND code <> 'systemAdministrator'`)
        ctx.body = new Response(true, errorCode.success)
      }
    } catch (error) {
      ctx.body = new Response(false, error)
    }
  }
  return ctx
}

module.exports = {
  save,
  list,
  del
}
