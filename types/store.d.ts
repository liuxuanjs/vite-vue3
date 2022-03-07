export interface UserInfo {
  userId?: string;
  userNname?: string;
}

export interface AppState {
  userInfo: Nullable<UserInfo>;
}
