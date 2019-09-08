const Router = require('koa-router');
const router = new Router();
const captcha = require('../controller/captcha');

router.get('/captcha', captcha);

module.exports = router;
