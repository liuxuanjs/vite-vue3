import request from '/@/utils/request';
import { GetAuthoritiesModel, GetUserInfoModel } from './model/userModel';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/admin/emp/getInfo',
  GetAuthorities = '/userRole/selectUserRoleAuthority',
}

/**
 * @description: getUserInfoApi
 */
export function getUserInfoApi(params) {
  return request.post<GetUserInfoModel>({ url: Api.GetUserInfo, ...params });
}

/**
 * @description: getAuthoritiesApi
 */
export function getAuthoritiesApi(params) {
  return request.post<GetAuthoritiesModel>({ url: Api.GetAuthorities, ...params });
}
