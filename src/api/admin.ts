import { defHttp } from '/@/utils/axios';

enum Api {
  AdminList = '/admin-user/getList',
  EditAdminUser = '/admin-user/editAdminUser',
}

/**
 * @description: getAdminListApi
 */
export function getAdminListApi(params) {
  return defHttp.get({ url: Api.AdminList, params });
}

/**
 * @description: editAdminUsertApi
 */
export function editAdminUsertApi(data) {
  return defHttp.post({ url: Api.EditAdminUser, data });
}
