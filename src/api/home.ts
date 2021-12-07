import request from '/@/utils/request';
import { indexParams, indexResultModel } from './model/homeModel';

enum Api {
  Home = '/index/index',
}

/**
 * @description: homeApi 首页数据
 */
export function homeApi(params?: indexParams) {
  return request.get<indexResultModel>({ url: Api.Home, data: params });
}
