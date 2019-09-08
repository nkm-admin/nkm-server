const Router = require('koa-router');
const router = new Router();
const registered = require('../controller/registered');

router.post('/registered', registered);

module.exports = router;
