const Router = require('koa-router');
const router = new Router({
  prefix: '/personal-center'
});
const { updateInfo, modifyPassword } = require('../controller/personalCenter');

router
  .post('/update-info', updateInfo)
  .post('/modify-password', modifyPassword);

  module.exports = router;
