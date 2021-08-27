/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  userId: number;
  // 用户名
  name: string;
  // 用户手机号
  mobile: string;
  // 用户角色类型
  roleType: number;
  // 用户角色类型名
  roleName: string;
}

interface AuthoritiesItem {
  // 用户id
  userId: number;
  // 用户角色类型
  roleType: number;
  // 用户角色类型名
  roleName: string;
  // 权限code
  code: string;
  // 权限名
  authorityName: string;
}

/**
 * @description: Get user authorities return value
 */
export interface GetAuthoritiesModel {
  // 用户id
  userId: number;
  // 用户名
  name: string;
  // 用户手机号
  mobile: string;
  // 用户角色类型
  roleType: number;
  // 用户角色类型名
  roleName: string;
  userRoleAuthorityList: AuthoritiesItem[];
}
