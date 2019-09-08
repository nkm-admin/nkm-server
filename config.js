module.exports = {
  app: {
    port: 3333
  },
  mysql: {
    nkmAdmin: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'nkm_admin'
    }
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    expire: 3600
  }
}
