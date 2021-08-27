export interface UserInfo {
  userId: number;
  name: string;
  mobile: string;
  roleType: number;
  roleName: string;
}

// export interface StoreInfo {
//   storeCode: string;
//   storeName: string;
//   main: boolean;
// }

export interface AppState {
  userInfo: Nullable<UserInfo>;
  authorities: string[];
  // allStores: StoreInfo[];
}
