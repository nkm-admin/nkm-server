const BASE_CONFIG = require('./config')
const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const helmet = require('koa-helmet')
const routes = require('./routes')
const check = require('./middleware/check')

app.use(helmet())
app.use(koaBody())

// 拦截器
app.use(check)

// 注册路由
routes.map(item => {
  item.prefix('/api/nkm-admin')
  app.use(item.routes())
})

app.on('error', error => {
  console.log('error===>', error)
})

app.listen(BASE_CONFIG.app.port, () => {
  console.log(`app listen http://localhost:${BASE_CONFIG.app.port}`)
})
