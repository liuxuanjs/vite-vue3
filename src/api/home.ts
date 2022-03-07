import { defHttp } from '/@/utils/axios';
import { indexResultModel } from './model/homeModel';

enum Api {
  Home = '/index/index/1',
}

/**
 * @description: homeApi 首页数据
 */
export function homeApi() {
  return defHttp.get<indexResultModel>({ url: Api.Home });
}
