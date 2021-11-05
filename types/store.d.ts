export interface UserInfo {
  userId: number;
  name: string;
  mobile: string;
  roleType: number;
  roleName: string;
}

export interface AppState {
  userInfo: Nullable<UserInfo>;
  authorities: string[];
}
