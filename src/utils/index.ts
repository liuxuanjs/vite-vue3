import { isObject } from '/@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 * 转换数组到对象形式
 * @param list 数组列表
 * @param key 待转换成对象的key
 * @returns {Object} 转换后的对象
 * eg:
 *  let arr = [{a: 1, b: 2}, {a: 3, b: 4}]
 *  setArrToObj(arr, 'a')
 *  ==>{1: {a: 1, b: 2}, 3: {a: 3, b: 4}}
 */
export function setArrToObj(list: any = [], key?: string) {
  const obj = {};
  list.forEach((item, index) => {
    if (key && isObject(item)) {
      obj[item[key]] = item;
    } else {
      obj[index] = item;
    }
  });
  return obj;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}
