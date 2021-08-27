import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'ant-design-vue';

import { buildUUID } from './uuid';

const apiPath = '/api';

interface RequestOptions extends AxiosRequestConfig {
  handleError?: boolean | string | Array<string | number>;
  original?: boolean;
}

function handleErrorFn(
  code: number,
  message: string,
  data: any,
  res: AxiosResponse<any>,
  options: RequestOptions
) {
  let { handleError } = options;

  const error = {
    name: 'HttpError',
    code,
    message: message || '请求未成功，请稍后再试吧～',
    data,
    res,
  };

  // 调用处有申明自己处理错误，handleError 支持如下三类值：
  //   true、'ALL'（或 'all'，不区分大小写），表示调用方会处理全部的错误
  //   '99001' 等（单个错误编码，字符串），表示调用方会处理特定的单个错误
  //   ['99001', '99002'] 等，（多个错误编码，数组），表示调用方会处理特定等多个错误
  if (handleError) {
    // 申明处理所有的错误时，直接将错误返回
    if (handleError === true || (typeof handleError === 'string' && /^ALL$/i.test(handleError))) {
      return error;
    }

    // 为便于统一操作，先将 handleError 参数转换成数组
    if (!Array.isArray(handleError)) {
      handleError = [handleError];
    }

    // 产生了申明要处理等错误时，返回此错误
    if (handleError.indexOf(code) > -1 || handleError.indexOf(`${code}`) > -1) {
      return error;
    }
  }

  // 登录态实效，跳转到个人中心页重新登录
  if (code === 401 || code === 40000003) {
    if (window.location.pathname !== '/login') {
      window.location.replace(`/login?backUrl=${encodeURIComponent(window.location.href)}`);
    }

    return null;
  }

  notification.error({
    message: '请求错误',
    description: error.message,
  });

  return error;
}

function request<T>(options: RequestOptions): Promise<T> {
  const { original, url = '', method = 'POST', headers = {}, ...restOptions } = options;

  const actualUrl = /^http/.test(url) ? url : apiPath + '/' + (url[0] === '/' ? url.slice(1) : url);
  const token = localStorage.getItem('token');
  const requestId = buildUUID();
  const actualHeaders = {
    'Content-Type': 'application/json',
    'Auth-Token': token,
    RequestId: requestId,
    ...headers,
  };

  if (method.toUpperCase() === 'GET') {
    restOptions.params = restOptions.data || {};
    delete restOptions.data;
  }

  return axios({
    headers: actualHeaders,
    url: actualUrl,
    method,
    ...restOptions,
  })
    .then((res) => {
      const { status, data: { code, message, data } = {} } = res;

      if (status === 200) {
        if (code === 1) {
          return Promise.resolve(original ? res : data);
        }
        const error = handleErrorFn(code, message, data, res, options);
        return Promise.reject(error);
      }
      const error = handleErrorFn(status, message, data, res, options);
      return Promise.reject(error);
    })
    .catch((err) => {
      // @ts-ignore
      const { message, response: { status } = {} } = err;
      const error = handleErrorFn(status, message, {}, err, options);

      return Promise.reject(error);
    });
}

request.get = <T = any>(options: AxiosRequestConfig): Promise<T> => {
  options.method = 'GET';

  return request(options);
};

request.post = <T = any>(options: AxiosRequestConfig): Promise<T> => {
  options.method = 'POST';

  return request(options);
};

export default request;
