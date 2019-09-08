const sql = require('../database/mysql');
const redis = require('../database/redis');
const Response = require('../utils/response');
const errorCode = require('../utils/errorCode');
const DateJS = require('../lib/date');
const { strip } = require('../utils');

const init = async ctx => {
  ctx.body = new Response(true, { data: '仪表盘数据请求成功' });
  return ctx;
}

module.exports = {
  init
}
