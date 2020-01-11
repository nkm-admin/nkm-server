const sql = require('../database/mysql')
const redis = require('../database/redis')
const schedule = require('node-schedule')
const fs = require('fs')

;(async () => {
  schedule.scheduleJob('1 1 1 * * *', async () => {
    // 删除未使用的文件
    try {
      let delList = await redis.smembers('uploadDelList')
      if (delList.length) {
        for (let i = 0; i < delList.length; i++) {
          try {
            // 查找文件的绝对路径
            let { path } = await redis.hget('upload', delList[i])

            if (!path) {
              [{ path }] = await sql(`SELECT path FROM nkm_files WHERE name = '${delList[i]}'`)
              await sql(`DELETE FROM nkm_files WHERE name = '${delList[i]}'`)
            }

            redis.origin.srem('uploadDelList', delList[i])

            // 磁盘删除文件
            path && fs.unlinkSync(path)
          } catch (error) {
            console.log(`${error}`.red)
            console.log(`${'[文件删除失败] '.yellow}${delList[i]}`)
            redis.origin.srem('uploadDelList', delList[i])
          }
        }
      }
    } catch (error) {
      console.log('[定时任务执行失败]'.red)
    }

    (async () => {
      let uploadList = await redis.hgetall('upload')
      if (JSON.stringify(uploadList) !== '{}') {
        for (let [fileName, { path, remote, size, type, isUsed }] of Object.entries(uploadList)) {
          try {
            if (isUsed) {
              await sql(`
                INSERT INTO
                  nkm_files(path, remote, size, type, name)
                  VALUES(
                    '${path}',
                    '${remote}',
                    ${size},
                    '${type}',
                    '${fileName}'
                  )
              `)
            }
            redis.origin.hdel('upload', fileName)
          } catch (error) {
            console.log(`${error}`.red)
          }
        }
      }
    })()
  })
})()
