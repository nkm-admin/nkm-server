const BASE_CONFIG = require('./config')
const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const helmet = require('koa-helmet')
const koaStatic = require('koa-static')
const routes = require('./routes')
const checkMiddleware = require('./middleware/check')
const uploadMiddleware = require('./middleware/upload')
const path = require('path')
const logger = require('koa-logger')

app.use(logger())

app.use(helmet())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1000 * 1024 * 1024
  }
}))

// 静态文件服务
app.use(koaStatic(path.join(__dirname, '/static')))

// 基础拦截器
app.use(checkMiddleware)

// 文件上传拦截器
app.use(uploadMiddleware)

// 注册路由
routes.map(item => {
  item.prefix('/api/nkm-admin')
  app.use(item.routes())
})

app.listen(BASE_CONFIG.app.port, () => {
  console.log(`app listen http://localhost:${BASE_CONFIG.app.port}`)
})
