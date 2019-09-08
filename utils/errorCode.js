module.exports = {
  success: {
    code: '0',
    message: '请求成功'
  },
  fail: {
    code: 'A1000',
    message: '参数不能为空'
  },
  queryFail: {
    code: 'F1000',
    message: '查询失败'
  },
  delFail: {
    code: 'F1001',
    message: '删除失败'
  },
  userRepeatRegistration: {
    code: 'A1001',
    message: '用户已存在'
  },
  loginUserNot: {
    code: 'A1002',
    message: '用户不存在'
  },
  loginWrongPassword: {
    code: 'A1003',
    message: '用户密码不正确'
  },
  loginExpired: {
    code: 'A1004',
    message: '登录已过期'
  },
  noToken: {
    code: 'A1005',
    message: '没有用户认证信息'
  },
  queryUserListFail: {
    code: 'A1006',
    message: '查询用户列表失败'
  },
  saveResourceFail: {
    code: 'A1007',
    message: '保存资源失败'
  },
  delRoleSystemAdmin: {
    code: 'A1008',
    message: '系统管理员不能被删除'
  },
  isDelSelf: {
    code: 'A1009',
    message: '自己不能删除自己'
  },
  captchaExpired: {
    code: 'A1010',
    message: '验证码已失效'
  },
  captchaError: {
    code: 'A1011',
    message: '验证码错误'
  },
  captchaInvalid: {
    code: 'A1012',
    message: '验证码请求无效'
  },
  noPermission: {
    code: 'A400403',
    message: '无请求权限'
  }
}
