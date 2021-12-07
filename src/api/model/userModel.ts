/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  pass: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
}

/**
 * @description: User information interface parameters
 */
export interface UserInfoParams {
  username?: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  userId: number;
  // 用户名
  userName: string;
}

/**
 * @description: User Sig interface parameters
 */
export interface UserSigParams {
  userId: string;
}
