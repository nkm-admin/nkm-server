const BASE_CONFIG = require('../config');
const sql = require('../database/mysql');
const redis = require('../database/redis');
const Response = require('../utils/response');
const errorCode = require('../utils/errorCode');
const encrypt = require('../utils/encrypt');
const { deepTree, sortArr } = require('../utils');

const login = async ctx => {
  const { loginName, password, userAgent, captcha } = ctx.request.body;

  // 查询用户信息
  const userInfo = await sql(`
    SELECT u.id, u.user_login_name, u.user_password, u.display_name, u.avatar, u.role, u.user_email, u.is_system_admin, r.permission
    FROM users u, role r
    WHERE u.user_login_name = '${loginName}'
    AND u.user_status = 1
    AND r.code = u.role
  `);

  // 判断用户是否存在
  if (!userInfo.length) {
    ctx.body = new Response(false, errorCode.loginUserNot);
  } else {
    // 判断用户密码是否正确
    if (userInfo[0].user_password !== encrypt.md5Slat(password)) {
      ctx.body = new Response(false, errorCode.loginWrongPassword);
      return ctx;
    }

    // 判断验证码是否正确
    const redisCaptcha = await redis.get(`captcha:${ctx.cookies.get('captchaToken')}`);
    if (!captcha) {
      ctx.body = new Response(false, errorCode.captchaError);
      return ctx;
    }
    if (captcha.toLocaleLowerCase() !== redisCaptcha.toLocaleLowerCase()) {
      ctx.body = new Response(false, errorCode.captchaError);
      return ctx;
    }

    // 登录成功
    const token = encrypt.md5Slat(`${loginName}-${Date.now()}`);

    // 转换权限为数组
    const permission = userInfo[0].permission.split(',');

    // 查询所有资源
    let resource = await sql(`SELECT * FROM resource`);

    // 生成菜单
    let menuList = [];

    // 菜单code
    let menuUrlList = [];

    // 按钮
    let btnList = [];

    let apiList = [
      '/api/my-admin/login',
      '/api/my-admin/login-out'
    ];

    resource.map(item => {
      // 遍历用户权限
      if (permission.findIndex(v => +v === item.id) !== -1) {
        if (item.type === 'system:resource:menu') {
          menuList.push(item);
          menuUrlList.push(item.url);
        } else if (item.type === 'system:resource:btn') {
          btnList.push(item.code);
        } else if (item.type === 'system:resource:api') {
          apiList.push(item.url);
        }
      }
    });

    // redis缓存用户信息
    await redis.set(`loginName:${loginName}`, token);
    await redis.hset(`user:${token}`, 'id', userInfo[0].id);
    await redis.hset(`user:${token}`, 'loginName', loginName);
    await redis.hset(`user:${token}`, 'token', token);
    await redis.hset(`user:${token}`, 'isAdmin', userInfo[0].is_system_admin);
    await redis.hset(`user:${token}`, 'apiList', JSON.stringify(apiList));
    redis.expire(`loginName:${loginName}`, BASE_CONFIG.redis.expire);
    redis.expire(`user:${token}`, BASE_CONFIG.redis.expire);

    ctx.body = new Response(true, {
      data: {
        token,
        menu: sortArr(deepTree(menuList, 0)),
        menuUrlList: [...menuUrlList, '/403', '/404', '/500'],
        btnList,
        displayName: userInfo[0].display_name,
        avatar: userInfo[0].avatar,
        email: userInfo[0].user_email
      }
    });

    // 记录最后登录信息
    await sql(`
      UPDATE users
      SET
        last_login_time = ${Date.now()},
        user_agent = '${userAgent}'
      WHERE user_login_name = '${loginName}'
    `);

    // 删除验证码缓存
    redis.del(`captcha:${ctx.cookies.get('captchaToken')}`);
  }
  return ctx;
}

const loginOut = async ctx => {
  try {
    ctx.body = new Response(true, errorCode.success);
    const { loginName } = await redis.hgetall(`user:${ctx.headers.token}`);
    redis.del(`loginName:${loginName}`);
    redis.del(`user:${ctx.headers.token}`);
  } catch (error) {
    ctx.body = new Response(false, errorCode.noToken);
  }
  return ctx;
}

module.exports = {
  login,
  loginOut
};
