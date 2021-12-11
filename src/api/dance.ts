import { defHttp } from '/@/utils/axios';
import { DanceListParams, DeleteDanceParams, UpdateDanceParams } from './model/danceModel';

enum Api {
  GetCDanceList = '/dance/list',
  UpdateDance = '/dance/addOrUpdate',
  DeleteDance = '/dance/delete',
  DanceAnalyse = '/index/danceDetail',
}

/**
 * @description: getDanceListApi
 */
export function getDanceListApi(params?: DanceListParams) {
  return defHttp.post({ url: Api.GetCDanceList, data: params });
}

/**
 * @description: updateDanceApi
 */
export function updateDanceApi(params?: UpdateDanceParams) {
  return defHttp.post({ url: Api.UpdateDance, data: params });
}

/**
 * @description: deleteDanceApi
 */
export function deleteDanceApi(params?: DeleteDanceParams) {
  return defHttp.get({ url: Api.DeleteDance, params });
}

/**
 * @description: getDanceAnalyseApi
 */
export function getDanceAnalyseApi(params?: any) {
  return defHttp.get({ url: Api.DanceAnalyse, params });
}
