const mysql = require('mysql')
const BASE_CONFIG = require('../config')
const nkmAdminDB = mysql.createConnection(BASE_CONFIG.mysql.nkmAdmin)

const sql = (sql) => {
  return new Promise((resolve, reject) => {
    nkmAdminDB.query(sql, (error, result) => {
      if (error) {
        console.log(`[mysql error] ${error}`)
        let errMsg = ''
        /* eslint-disable */
        switch (error.errno) {
          // 用户信息有误
          case 1045:
            errMsg = {
              message: '用户认证异常！',
              code: 'M' + error.errno
            }
            break
          default:
            errMsg = {
              message: '数据异常！',
              code: 'M' + error.errno
            }
        }
        /* eslint-disable */
        reject(errMsg)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = sql
