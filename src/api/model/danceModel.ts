/**
 * @description: getUserList interface parameters
 */
export interface DanceListParams {
  pageNum?: number;
  pageSize?: number;
  status?: string;
  difficulty?: number;
  style?: string;
  name?: string;
}

export interface CustomerItem {
  // 用户id
  id: number;
  // 昵称
  nickName: string;
  // 生日
  birthday: string;
  // 性别
  sex: string;
  // 头像
  profilePhoto: string;
  // 创建时间
  insertTime: string;
  // 跳舞次数
  danceCount: string;
}

/**
 * @description: getUserList interface return value
 */
export interface GetCustomerListModel {
  // 用户id
  current: number;
  // 用户名
  total: number;
  // 用户手机号
  records: CustomerItem[];
}

/**
 * @description: addOrUpdate interface parameters
 */
export interface UpdateDanceParams {
  id: number;
  status: number;
}

/**
 * @description: deleteUser interface parameters
 */
export interface DeleteDanceParams {
  id: number;
}
