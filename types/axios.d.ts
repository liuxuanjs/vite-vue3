export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // 接口地址
  apiUrl?: string;
  // 是否加入时间戳
  joinTime?: boolean;
  // post请求的时候是否添加参数到url
  joinParamsToUrl?: boolean;
  // 是否需要对返回数据进行处理
  isTransformResponse?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否忽略重复请求
  ignoreRepeatedReq?: boolean;
  // 是否携带token
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  msg: string;
  data: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
