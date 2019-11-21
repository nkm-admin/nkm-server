const sql = require('../../database/mysql');
const Response = require('../../utils/response');
const errorCode = require('../../utils/errorCode');
const { deepTree, sortArr } = require('../../utils');

const save = async ctx => {
  const {
    id,
    name,
    code,
    parentId = 0,
    parentCode = '',
    icon = '',
    sort = 0,
    path,
    type = '',
    enable = 1
  } = ctx.request.body;
  // 参数为空直接返回错误信息
  if (!name || !code || !type) {
    ctx.body = new Response(false, errorCode.fail);
  } else {
    try {
      // 如果没有id就插入数据，否则更新数据
      if (!id) {
        await sql(`
          INSERT INTO
            nkm_resource (
              name,
              code,
              parent_id,
              parent_code,
              icon,
              sort,
              path,
              type,
              enable,
              create_time
            )
            VALUES (
              '${name}',
              '${code}',
              ${parentId},
              '${parentCode}',
              '${icon}',
              ${sort},
              '${path}',
              '${type}',
              ${enable},
              ${Date.now()}
            )
        `);
      } else {
        await sql(`
          UPDATE nkm_resource
          SET
            name = '${name}',
            code = '${code}',
            parent_id = ${parentId},
            parent_code = '${parentCode}',
            icon = '${icon}',
            sort = ${sort},
            path = '${path}',
            enable = ${enable},
            type = '${type}'
          WHERE id = ${id}
        `);
      }
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, errorCode.saveResourceFail);
    }
  }
  return ctx;
}

const tree = async ctx => {
  try {
    let data = await sql(`SELECT * FROM nkm_resource WHERE is_delete = 0`);
    data.map(item => item.children = []);
    ctx.body = new Response(true, {
      data: sortArr(deepTree(data))
    });
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
      await sql(`UPDATE nkm_resource SET is_delete = 1 WHERE id = ${id}`);
      ctx.body = new Response(true, errorCode.success);
    } catch (error) {
      ctx.body = new Response(false, error);
    }
  }
  return ctx;
}

module.exports = {
  save,
  tree,
  del
}
