const Router = require('koa-router')
const router = new Router()
const { login, loginOut } = require('../controller/login')

router
  .post('/login', login)
  .post('/login-out', loginOut)

module.exports = router
