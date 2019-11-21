const Router = require('koa-router')
const router = new Router({
  prefix: '/system/resource'
})
const { save, tree, del } = require('../../controller/system/resource')

router
  .post('/save', save)
  .post('/tree', tree)
  .post('/del', del)

module.exports = router
