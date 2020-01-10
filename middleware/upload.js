const { allowFiles, imageMaxSize, videoMaxSize, fileMaxSize } = require('../config').upload
const errorCode = require('../utils/errorCode')
const Response = require('../utils/response')

const upload = async (ctx, next) => {
  const check = ({ type, size }) => {
    let _type = type.replace(/[a-z]+\//ig, '')

    // 判断上传文件类型是否存在
    if (allowFiles.findIndex(v => v === _type) === -1) {
      ctx.body = new Response(false, errorCode.noFileType)
      return false
    }

    // 图片大小超出范围
    if (/^image/.test(type) && size > imageMaxSize) {
      ctx.body = new Response(false, errorCode.imageSizeBeyond)
      return false
    }

    // 视频大小超出范围
    if (/^video/.test(type) && size > videoMaxSize) {
      ctx.body = new Response(false, errorCode.videoSizeBeyond)
      return false
    }

    // 文件大小超出范围
    if (size > fileMaxSize) {
      ctx.body = new Response(false, errorCode.fileSizeBeyond)
      return false
    }

    return true
  }

  if (ctx.url === '/api/nkm-admin/upload') {
    const files = ctx.request.files.file
    if (!files) {
      ctx.body = new Response(false, errorCode.noFile)
      return ctx
    }

    if (Array.isArray(files)) {
      return ctx.body = new Response(false, errorCode.noMultipleFile)
      // return files.every(file => check(file)) ? next() : ctx
    } else {
      return check(files) ? await next() : ctx
    }
  } else {
    await next()
  }
}

module.exports = upload
