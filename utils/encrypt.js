const md5 = require('md5');
const jwt = require('jsonwebtoken');

class Encrypt {
  constructor() {
    this.secrpt = '@#$%^&*'
  }

  // md5加密加盐
  md5Slat (str) {
    return md5(md5(str) + this.secrpt);
  }

  jwtSign (obj, opt = {}) {
    return jwt.sign(obj, this.secrpt, {
      expiresIn: '1h',
      ...opt
    });
  }

  jwtVerify (token) {
    return jwt.verify(token, this.secrpt);
  }

  jwtDecode (token, opt) {
    return jwt.decode(token, opt);
  }
}

module.exports = new Encrypt();
