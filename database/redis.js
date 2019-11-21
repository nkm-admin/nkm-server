const BASE_CONFIG = require('../config')
const redis = require('redis')
const client = redis.createClient(BASE_CONFIG.port, BASE_CONFIG.host)
require('colors')

client.on('error', err => console.log(`[Redis error] ${err}`))

class Instance {
  constructor () {}
  set (key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, error => {
        if (error) {
          reject(error)
          console.log(`[Redis set error] ${error}`)
        } else {
          resolve()
        }
      })
    })
  }
  get (key) {
    return new Promise((resolve, reject) => {
      client.get(key, (error, value) => {
        if (error) {
          reject(error)
          console.log(`[Redis get error] ${error}`)
        } else {
          resolve(value)
        }
      })
    })
  }
  del (key) {
    return new Promise((resolve, reject) => {
      client.del(key, error => {
        if (error) {
          reject(error)
          console.log(`[Redis del error] ${error}`)
        } else {
          resolve(true)
        }
      })
    })
  }
  expire (key, seconds) {
    client.expire(key, seconds)
  }
  hset (field, key, value) {
    return new Promise((resolve, reject) => {
      client.hset(field, key, value, error => {
        if (error) {
          reject(error)
          console.log(`[Redis hset error] ${error}`)
        } else {
          resolve()
        }
      })
    })
  }
  hgetall (key) {
    return new Promise((resolve, reject) => {
      client.hgetall(key, (error, value) => {
        if (error || value === null) {
          reject(error)
          console.log(`[Redis hgetall error] ${error}`)
        } else {
          let result = {}
          for (let [_key, _value] of Object.entries(value)) {
            try {
              result[_key] = JSON.parse(_value)
            } catch (error) {
              result[_key] = _value
            }
          }
          resolve(result)
        }
      })
    })
  }
}

module.exports = new Instance()
