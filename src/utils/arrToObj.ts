/**
 * 转换数组到对象形式
 * @param {Array} list 数组列表
 * @param {String} key 待转换成对象的key
 * @return {Object} 转换后的对象
 */
export default function arrToObj(list, key) {
  const obj = {};

  list.forEach((item, index) => {
    if (key && item && typeof item === 'object') {
      obj[item[key]] = item;
    } else {
      obj[index] = item;
    }
  });

  return obj;
}
