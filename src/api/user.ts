import request from '/@/utils/request';
import { LoginParams, LoginResultModel, UserInfoParams, GetUserInfoModel } from './model/userModel';

enum Api {
  Login = '/user/login',
  // Logout = '/logout',
  GetUserInfo = '/admin/emp/getInfo',
}

/**
 * @description: loginApi
 */
export function loginApi(params?: LoginParams) {
  return request.get<LoginResultModel>({ url: Api.Login, data: params });
}

// /**
//  * @description: logoutApi
//  */
// export function logoutApi(params?: LoginParams) {
//   return request.get<LoginResultModel>({ url: Api.Login, data: params });
// }

/**
 * @description: getUserInfoApi
 */
export function getUserInfoApi(params?: UserInfoParams) {
  return request.post<GetUserInfoModel>({ url: Api.GetUserInfo, ...params });
}
