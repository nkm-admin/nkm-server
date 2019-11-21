const Router = require('koa-router')
const router = new Router({
  prefix: '/dashboard'
})
const { init } = require('../controller/dashboard')

router
  .post('/init', init)

module.exports = router
