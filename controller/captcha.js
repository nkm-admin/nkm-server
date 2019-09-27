const Response = require('../utils/response');
const redis = require('../database/redis');
const errorCode = require('../utils/errorCode');
const encrypt = require('../utils/encrypt');
const svgCaptcha = require('svg-captcha');

const captcha = async ctx => {
  let { token, v } = ctx.query;
  let _token = '';
  const { text, data: image } = svgCaptcha.create({
    noise: 2,
    color: true,
    ignoreChars: '0o1i',
    width: 100,
    height: 30,
    fontSize: 36
  });

  if (token === undefined) {
    _token = encrypt.md5Slat(Math.random());
    await redis.set(`captcha:${_token}`, text);
    redis.expire(`captcha:${_token}`, 600);
    ctx.cookies.set('captchaToken', _token);
    ctx.body = new Response(true, {
      data: {
        token: _token,
        image,
        text
      }
    });
  } else {
    // 判断缓存中有没有此token
    const isValid = await redis.get(`captcha:${token}`);
    if (!isValid) {
      ctx.body = new Response(false, errorCode.captchaInvalid);
      return ctx;
    } else {
      await redis.set(`captcha:${token}`, text);
      redis.expire(`captcha:${token}`, 600);
      ctx.body = new Response(true, {
        data: {
          token: token,
          image,
          text
        }
      });
    }
  }
  return ctx;
}

module.exports = captcha;
