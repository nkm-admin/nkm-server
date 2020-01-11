module.exports = {
  app: {
    host: 'http://localhost:3333',
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
  },
  upload: {
    fileMaxSize: 50 * 1024 * 1024,
    imageMaxSize: 2 * 1024 * 1024,
    videoMaxSize: 100 * 1024 * 1024,
    // eslint-disable-next-line
    allowFiles: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'flv', 'swf', 'mkv', 'avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'ogg', 'ogv', 'mov', 'wmv', 'mp4', 'webm', 'mp3', 'wav', 'mid', 'rar', 'zip', 'tar', 'gz', '7z', 'bz2', 'cab', 'iso', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md', 'xml']
  }
}
