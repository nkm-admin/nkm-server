const sql = require('../../database/mysql')
const Response = require('../../utils/response')
const errorCode = require('../../utils/errorCode')
const { deepTree, sortArr } = require('../../utils')

const save = async ctx => {
  const { id, name, code, value = code, parentId = 0, sort = 0 } = ctx.request.body
  const realValue = value ? value : code
  // 如果有id为修改否则为新增
  if (!name || !code) {
    ctx.body = new Response(false, errorCode.fail)
  } else {
    try {
      const isRepeat = await sql(`SELECT * FROM nkm_dictionary WHERE code = '${code}'`)
      if (!id) {
        if (isRepeat.length) {
          ctx.body = new Response(false, { message: '字典编码已存在' })
        } else {
          await sql(`
            INSERT INTO
            nkm_dictionary(name, code, value, parent_id, sort, create_time)
            VALUES('${name}', '${code}', '${realValue}', ${parentId}, ${sort}, ${Date.now()})
          `)
          ctx.body = new Response(true, errorCode.success)
        }
      } else {
        await sql(`
          UPDATE nkm_dictionary
          SET
            name = '${name}',
            code = '${code}',
            value = '${realValue}',
            parent_id = ${parentId},
            sort = ${sort}
          WHERE id = ${id}
        `)
        ctx.body = new Response(true, errorCode.success)
      }
    } catch (error) {
      ctx.body = new Response(false, error)
    }
  }
  return ctx
}

const tree = async ctx => {
  try {
    let data = await sql(`
      SELECT id, name, code, value, parent_id, sort
      FROM nkm_dictionary
      WHERE is_delete = 0
    `)
    data.map(item => item.children = [])
    ctx.body = new Response(true, { data: sortArr(deepTree(data)) })
  } catch (error) {
    ctx.body = new Response(false, errorCode.queryFail)
  }
  return ctx
}

const del = async ctx => {
  try {
    const { id } = ctx.request.body
    if (!id) {
      ctx.body = new Response(false, errorCode.fail)
    } else {
      await sql(`UPDATE nkm_dictionary SET is_delete = 1 WHERE id = ${id}`)
      ctx.body = new Response(true, errorCode.success)
    }
  } catch (error) {
    ctx.body = new Response(false, errorCode.delFail)
  }
  return ctx
}

module.exports = {
  save,
  tree,
  del
}
