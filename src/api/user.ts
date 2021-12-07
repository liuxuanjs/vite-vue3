import request from '/@/utils/request';
import {
  LoginParams,
  LoginResultModel,
  // UserInfoParams,
  // GetUserInfoModel,
  UserSigParams,
} from './model/userModel';

enum Api {
  Login = '/user/login',
  // Logout = '/logout',
  // GetUserInfo = '/admin/emp/getInfo',
  GetUserSig = '/user/genUserSig',
  GetUserAnalyse = '/index/userDetail',
  GetNewUserCount = '/index/newUserCount',
}

/**
 * @description: loginApi 后台登陆
 */
export function loginApi(params?: LoginParams) {
  return request.get<LoginResultModel>({ url: Api.Login, data: params });
}

/**
 * @description: logoutApi 退出登陆
 */
export function logoutApi() {
  // 现在没有退出登陆接口
  return Promise.resolve();
  // return request.get({ url: Api.Login, data: params });
}

/**
 * @description: getUserInfoApi 获取用户信息
 */
// export function getUserInfoApi(params?: UserInfoParams) {
export function getUserInfoApi() {
  // 本身应该由接口校验用户是否登陆的，现在只能前端从缓存中取；接口如果完善了直接去掉，用下面的
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return Promise.resolve(JSON.parse(userInfo));
  }
  if (window.location.pathname !== '/login') {
    window.location.replace(`/login?backUrl=${encodeURIComponent(window.location.href)}`);
  }
  return Promise.reject();

  // return request.post<GetUserInfoModel>({ url: Api.GetUserInfo, ...params });
}

/**
 * @description: getUserSigApi 获取当前登陆人sign
 */
export function getUserSigApi(params?: UserSigParams) {
  return request.get({ url: Api.GetUserSig, data: params });
}
