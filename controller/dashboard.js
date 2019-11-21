const Response = require('../utils/response')

const init = async ctx => {
  ctx.body = new Response(true, { data: '仪表盘数据请求成功' })
  return ctx
}

module.exports = {
  init
}
