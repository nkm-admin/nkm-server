/**
 * 下划线转小驼峰
 * @param  {String} str display_name
 * @return {String}     displayName
 */
const toLowerCamelCase = str => {
  return str.replace(/(_[a-z])/g, $1 => $1.replace('_', '').toLocaleUpperCase());
}

/**
 * 是否为对象
 * @param  {*}  obj
 * @return {Boolean}
 */
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

/**
 * 一维数组转换为树形结构
 * @param {Array} arr
 * @param {*} parentId 初始父级id
 * @return {Array} 树形数据
 */
const deepTree = (arr, parentId = 0) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parent_id === parentId) {
      arr[i].children = deepTree(arr, arr[i].id);
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * 对数组进行排序
 * @param {Array} arr
 * @param {Object} param1 可选字段进行排序比对，默认是查找当前的children字段，sort排序字段
 * @return {Array} 处理后的数组
 */
const sortArr = (arr, { children, sort } = {}) => {
  arr.map(item => {
    if (item['children'].length) item['children'] = sortArr(item['children']);
  });
  return arr.sort((a, b) => a['sort'] - b['sort']);
}

/**
 * 转换数字精度
 * @param {*} num
 * @param {*} precision
 */
const strip = (num, precision = 12) => parseFloat(num.toPrecision(precision))

module.exports = {
  toLowerCamelCase,
  isObject,
  deepTree,
  sortArr,
  strip
}
