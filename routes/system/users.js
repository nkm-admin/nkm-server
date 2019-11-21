const Router = require('koa-router')
const router = new Router({
  prefix: '/system/user'
})
const { list, modifyStatus, resetPassword, allocationRole } = require('../../controller/system/users')

router
  .post('/list', list)
  .post('/reset-password', resetPassword)
  .post('/allocation-role', allocationRole)
  .post('/modify', modifyStatus)

module.exports = router
