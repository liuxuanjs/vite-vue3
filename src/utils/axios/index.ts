import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { VAxios } from './Axios';
import { useGlobSetting } from '/@/hooks/useGlobSetting';
import { useMessage } from '/@/hooks/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import { isString } from '/@/utils/is';
import { setObjToUrlParams, deepMerge } from '/@/utils';
import { joinTimestamp } from './helper';
import { store } from '/@/store';

const globSetting = useGlobSetting();
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, joinTime = true } = options;

    apiUrl && isString(apiUrl) && (config.url = `${apiUrl}${config.url}`);

    const params = config.params || {};

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        // 非GET请求如果没有提供data，则将params视为data
        if (!Reflect.has(config, 'data') || !config.data) {
          config.data = params;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求之前的拦截器
   */
  // eslint-disable-next-line
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = window.localStorage.getItem('token');
    if (token && options?.requestOptions?.withToken !== false) {
      config['Auth-Token'] = token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应数据处理
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnNativeResponse, isTransformResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) return res;

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) return res.data;

    const { data: responseData } = res;
    // 错误的时候返回
    if (!responseData) {
      throw new Error('请求出错，请稍候重试');
    }

    const { code, data, msg } = responseData;

    // 请求成功
    const hasSuccess = responseData && code === ResultEnum.SUCCESS;
    if (hasSuccess) return data;

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = msg || '请求出错，请稍候重试';
    if (code === ResultEnum.TIMEOUT) {
      timeoutMsg = '登录超时,请重新登录!';
      store.dispatch('getUserInfo');
    }

    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg);
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { message, config } = error || {};
    // const { status } = error.response || {};

    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const err: string = error?.toString?.() ?? '';
    let msg = message;

    try {
      message.indexOf('timeout') !== -1 && (msg = '接口请求超时,请刷新页面重试!');
      err?.includes('Network Error') && (msg = '网络异常，请检查您的网络连接是否正常!');

      if (msg) {
        errorMessageMode === 'modal' && createErrorModal({ title: '错误提示', content: msg });
        errorMessageMode === 'message' && createMessage.error(msg);
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        timeout: 10 * 1000,
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 是否忽略重复请求
          ignoreRepeatedReq: false,
          // 是否携带token
          withToken: true,
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 是否加入时间戳
          joinTime: true,
          // post请求的时候是否添加参数到url
          joinParamsToUrl: false,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 是否需要对返回数据进行处理
          isTransformResponse: true,
          // 消息提示类型
          // ‘modal’ 会显示 modal 错误弹窗，而不是消息提示，用于一些比较重要的错误
          // ‘message’ 会显示 message 消息提示
          // 'none' 一般是调用时明确表示不希望自动弹出错误提示
          errorMessageMode: 'message',
          ignoreCancelToken: true,
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();

// 当项目中需要用到多个接口地址时，可以导出多个 axios 实例
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
