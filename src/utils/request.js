// import axios from 'axios';
// import { notification } from 'ant-design-vue';
// // import { CloseCircleOutlined } from '@ant-design/icons-vue';
// // import NProgress from 'nprogress';
// import { buildUUID } from './uuid';

// const apiPath = '/api';

// function getDeviceId() {
//   let deviceId = localStorage.getItem('device_id');

//   if (deviceId) {
//     return deviceId;
//   } else {
//     deviceId = buildUUID();
//     localStorage.setItem('device_id', deviceId);
//     return deviceId;
//   }
// }

// function handleErrorFn(code, message, data, res, options) {
//   let { handleError } = options;

//   const error = {
//     name: 'HttpError',
//     code,
//     message: message || '',
//     data,
//     res,
//     text: '请求未成功，请稍后再试吧～',
//   };

//   // 调用处有申明自己处理错误，handleError 支持如下三类值：
//   //   true、'ALL'（或 'all'，不区分大小写），表示调用方会处理全部的错误
//   //   '99001' 等（单个错误编码，字符串），表示调用方会处理特定的单个错误
//   //   ['99001', '99002'] 等，（多个错误编码，数组），表示调用方会处理特定等多个错误
//   if (handleError) {
//     // 申明处理所有的错误时，直接将错误返回
//     if (handleError === true || /^ALL$/i.test(handleError)) {
//       return error;
//     }

//     // 为便于统一操作，先将 handleError 参数转换成数组
//     if (!Array.isArray(handleError)) {
//       handleError = [handleError];
//     }

//     // 产生了申明要处理等错误时，返回此错误
//     if (handleError.indexOf(code) > -1 || handleError.indexOf(`${code}`) > -1) {
//       return error;
//     }
//   }

//   // 登录态实效，跳转到个人中心页重新登录
//   if (code === 401 || code === 40000003) {
//     if (window.location.pathname !== '/login') {
//       window.location.replace(`/login?backUrl=${encodeURIComponent(window.location.href)}`);
//     }

//     return null;
//   }

//   notification.error({
//     message: '请求错误',
//     description: error.message || error.text,
//   });

//   return error;
// }

// function request(options, download) {
//   const { original, url, method = 'POST', headers = {}, ...restOptions } = options;

//   const actualUrl = /^http/.test(url) ? url : `${apiPath}/${url.replace(/\//g, '')}`;
//   const token = localStorage.getItem('token');
//   const actualHeaders = {
//     'Content-Type': 'application/json',
//     'Auth-Token': token,
//     deviceType: 1,
//     deviceId: getDeviceId(),
//     RequestId: buildUUID(),
//     ...headers,
//   };

//   if (method.toUpperCase() === 'GET') {
//     restOptions.params = restOptions.data || {};
//     delete restOptions.data;
//   }

//   return new Promise((resolve, reject) => {
//     return axios({
//       ...restOptions,
//       headers: actualHeaders,
//       url: actualUrl,
//       method,
//     }).then(
//       (res) => {
//         // 下载
//         if (download && res.status === 200) {
//           return resolve(res);
//         }

//         const { status, data: { code, message, errMessage, data } = {} } = res;

//         // HTTP成功
//         if (status === 200) {
//           if (code === 1) {
//             resolve(original ? res : data);
//           } else {
//             console.log('业务异常：\n', res);
//             const error = handleError(code, message, data, res, options);
//             reject(error);
//           }
//         } else {
//           console.log('HTTP异常：\n', res);
//           const error = handleError(status, message || errMessage, data, res, options);
//           reject(error);
//         }
//       },
//       (err) => {
//         console.log('HTTP异常：\n', err);
//         const error = handleError(status, '', {}, err, options);
//         reject(error);

//         if (err.message === 'Request failed with status code 401') {
//           if (location.pathname !== '/login') {
//             location.replace('/login?backUrl=' + encodeURIComponent(location.href));
//           }
//         }
//       }
//     );
//   });
// }

// request.get = function (options) {
//   options.method = 'GET';

//   return request(options);
// };

// request.post = function (options) {
//   options.method = 'POST';

//   return request(options);
// };

// // 下载
// request.download = function (options) {
//   options.method = 'POST';

//   return request(options, true).then((res) => {
//     const { data, headers } = res;
//     const href = URL.createObjectURL(data);
//     const a = document.createElement('a');
//     const contentDisposition = headers['content-disposition'] || '';
//     const dispositionParts = contentDisposition.split(';');

//     for (let i = dispositionParts.length - 1; i >= 0; i--) {
//       const match = /filename=(.*)/.exec(dispositionParts[i]);
//       if (match) {
//         // 下载文件名
//         a.download = decodeURIComponent(match[1]);
//         break;
//       }
//     }

//     a.href = href;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(href);
//   });
// };

// export default request;

import axios from 'axios';
import { notification } from 'ant-design-vue';
import { buildUUID } from './uuid';

const apiPath = '/api';

function handleErrorFn(code, message, data, res, options) {
  let { handleError } = options;

  const error = {
    name: 'HttpError',
    code,
    message: message || '',
    data,
    res,
    text: '请求未成功，请稍后再试吧～',
  };

  // 调用处有申明自己处理错误，handleError 支持如下三类值：
  //   true、'ALL'（或 'all'，不区分大小写），表示调用方会处理全部的错误
  //   '99001' 等（单个错误编码，字符串），表示调用方会处理特定的单个错误
  //   ['99001', '99002'] 等，（多个错误编码，数组），表示调用方会处理特定等多个错误
  if (handleError) {
    // 申明处理所有的错误时，直接将错误返回
    if (handleError === true || /^ALL$/i.test(handleError)) {
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
    description: error.message || error.text,
  });

  return error;
}

function request(options) {
  const { original, url, method = 'POST', headers = {}, isFile = false, ...restOptions } = options;

  const actualUrl = /^http/.test(url) ? url : `${apiPath}/${url.replace(/\//g, '')}`;
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
    ...restOptions,
    headers: actualHeaders,
    url: actualUrl,
    method,
  }).then(
    (res) => {
      const { status, data: { code, message, data } = {} } = res;

      if (status === 200) {
        // 下载流文件，没有code，直接取data
        if (isFile) {
          return Promise.resolve(res.data);
        }
        if (code === 1) {
          return Promise.resolve(original ? res : data);
        }
        const error = handleErrorFn(code, message, data, res, options);
        return Promise.reject(error);
      }
      const error = handleErrorFn(status, message, data, res, options);
      return Promise.reject(error);
    },
    (err) => {
      // @ts-ignore
      const { message, response: { status } = {} } = err;

      const error = handleErrorFn(status, message, {}, err, options);
      return Promise.reject(error);
    }
  );
}

request.get = (options) => {
  options.method = 'GET';

  return request(options);
};

request.post = (options) => {
  options.method = 'POST';

  return request(options);
};

export default request;
