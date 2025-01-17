const Router = require('koa-router')
const router = new Router({
  prefix: '/system/dictionary'
})

const { save, tree, del } = require('../../controller/system/dictionary')

router
  .post('/save', save)
  .post('/tree', tree)
  .post('/del', del)

module.exports = router
