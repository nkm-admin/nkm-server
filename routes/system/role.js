const Router = require('koa-router');
const router = new Router({
  prefix: '/system/role'
});
const { save, list, del } = require('../../controller/system/role');

router
  .post('/save', save)
  .post('/list', list)
  .post('/del', del);

module.exports = router;
