const { toLowerCamelCase, isObject } = require('./index');

class Response {
  constructor (flag, obj) {
    return flag
      ? this._success({
        data: obj.data,
        count: obj.count,
        message: obj.message
      })
      : this._error({
        message: obj.message,
        code: obj.code
      });
  }
  _model ({ data = null, message = '请求成功！', code = 200, success = true, count = 0 } = {}) {
    return {
      data,
      message,
      code,
      success,
      count
    }
  }
  _success ({ data, count, message }) {
    // 转换字段为下划线分割为小驼峰
    const deepConversion = data => {
      let newData = null;
      if (Array.isArray(data)) {
        newData = [];
        data.map((item, i) => {
          if (isObject(item)) {
            newData[i] = {};
            for (let [key, value] of Object.entries(item)) {
              // 如果是数组或者对象继续递归
              if ((Array.isArray(value) && value.length) || isObject(value)) {
                newData[i][toLowerCamelCase(key)] = deepConversion(value);
              } else {
                newData[i][toLowerCamelCase(key)] = value;
              }
            }
          } else {
            newData[i] = item;
          }
        });
      } else if (isObject(data)) {
        newData = {};
        for (let [key, value] of Object.entries(data)) {
          // 如果是数组或者对象继续递归
          if ((Array.isArray(value) && value.length) || isObject(value)) {
            newData[toLowerCamelCase(key)] = deepConversion(value);
          } else {
            newData[toLowerCamelCase(key)] = value;
          }
        }
      } else {
        newData = data;
      }
      return newData;
    }
    return this._model({ data: deepConversion(data), count, message });
  }
  _error ({ message, code, data, success }) {
    return this._model({ data, message, code, success: false });
  }
}

module.exports = Response;
