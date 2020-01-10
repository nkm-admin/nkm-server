const Router = require('koa-router')
const router = new Router()
const login = require('./login')
const registered = require('./registered')
const system = require('./system')
const personalCenter = require('./personalCenter')
const dashboard = require('./dashboard')
const captcha = require('./captcha')
const upload = require('./upload')

router.get('/', ctx => {
  ctx.body = [
    router,
    login,
    registered,
    ...system,
    personalCenter,
    dashboard,
    upload
  ]
})

module.exports = [
  router,
  login,
  registered,
  ...system,
  personalCenter,
  dashboard,
  captcha,
  upload
]
