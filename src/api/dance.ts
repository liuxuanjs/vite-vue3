import request from '/@/utils/request';
import { DanceListParams, DeleteDanceParams, UpdateDanceParams } from './model/danceModel';

enum Api {
  GetCDanceList = '/dance/list',
  UpdateDance = '/dance/addOrUpdate',
  DeleteDance = '/dance/delete',
}

/**
 * @description: getDanceListApi
 */
export function getDanceListApi(params?: DanceListParams) {
  return request.post({ url: Api.GetCDanceList, data: params });
}

/**
 * @description: updateDanceApi
 */
export function updateDanceApi(params?: UpdateDanceParams) {
  return request.post({ url: Api.UpdateDance, data: params });
}

/**
 * @description: deleteDanceApi
 */
export function deleteDanceApi(params?: DeleteDanceParams) {
  return request.get({ url: Api.DeleteDance, data: params });
}
