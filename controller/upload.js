const fs = require('fs')
const path = require('path')
const Response = require('../utils/response')
const dateJS = require('../lib/date')
const { address } = require('../config').app
const sql = require('../database/mysql')

const upload = async ctx => {
  try {
    // 存放文件的目录
    const dir = path.join(__dirname, '../static/upload')

    const year = dateJS().format('yyyy')
    const month = dateJS().format('MM')
    const day = dateJS().format('dd')
    const hour = dateJS().format('HH')
    const minute = dateJS().format('mm')
    const second = dateJS().format('ss')

    // 判断目录是否存在
    !fs.existsSync(dir) && fs.mkdirSync(dir)
    !fs.existsSync(`${dir}/${year}`) && fs.mkdirSync(`${dir}/${year}`)
    !fs.existsSync(`${dir}/${year}/${month}`) && fs.mkdirSync(`${dir}/${year}/${month}`)

    const writeDir = `${dir}/${year}/${month}`

    // 获取上传文件
    const file = ctx.request.files.file

    // 创建可读流
    const reader = fs.createReadStream(file.path)

    // 获取上传文件扩展名
    const ext = file.name.split('.').pop()

    // 文件类型
    const fileType = file.type

    // 文件大小
    const fileSize = file.size

    // 文件名
    const filename = `${year}${month}${day}${hour}${minute}${second}${Math.random().toString().substring(2, 8)}.${ext}`

    // 创建可写流
    const upStream = fs.createWriteStream(`${writeDir}/${filename}`)
    const remoteAddress = `${address}/upload/${year}/${month}/${filename}`

    // 可读流通过管道写入可写流
    reader.pipe(upStream)

    await sql(`
      INSERT INTO
        nkm_files(path, remote, size, type)
        VALUES('${writeDir}/${filename}', '/upload/${year}/${month}/${filename}', ${fileSize}, '${fileType}')
    `)

    ctx.body = new Response(true, {
      data: {
        url: remoteAddress,
        size: fileSize,
        type: fileType
      }
    })
  } catch (error) {
    ctx.body = new Response(false, error)
  }
  return ctx
}

module.exports = {
  upload
}
