import { defHttp } from '/@/utils/axios';
import {
  CustomerListParams,
  DeleteCustomerParams,
  GetCustomerListModel,
  UpdateCustomerParams,
  NewCustomerCountParams,
  NewCustomerRecordCountParams,
} from './model/customerModel';

enum Api {
  GetCustomerList = '/user/getUserList',
  UpdateCustomer = '/user/addOrUpdate',
  DeleteCustomer = '/user/deleteUser',
  GetCustomerAnalyse = '/index/userDetail',
  GetNewCustomerCount = '/index/newUserCount',
  CustomerRecordDetail = '/index/userRecordDetail',
  GetNewCustomerRecordCount = '/index/newUserRecordCount',
}

/**
 * @description: getCustomerListApi
 */
export function getCustomerListApi(params?: CustomerListParams) {
  return defHttp.post<GetCustomerListModel>({ url: Api.GetCustomerList, data: params });
}

/**
 * @description: updateCustomerApi
 */
export function updateCustomerApi(params?: UpdateCustomerParams) {
  return defHttp.post({ url: Api.UpdateCustomer, data: params });
}

/**
 * @description: deleteCustomerApi
 */
export function deleteCustomerApi(params?: DeleteCustomerParams) {
  return defHttp.get({ url: Api.DeleteCustomer, params });
}

/**
 * @description: getCustomerAnalyseApi
 */
export function getCustomerAnalyseApi() {
  return defHttp.get({ url: Api.GetCustomerAnalyse });
}

/**
 * @description: getNewCustomerCountApi
 */
export function getNewCustomerCountApi(params: NewCustomerCountParams) {
  return defHttp.get({ url: Api.GetNewCustomerCount, params });
}

/**
 * @description: getCustomerRecordDetailApi
 */
export function getCustomerRecordDetailApi() {
  return defHttp.get({ url: Api.CustomerRecordDetail });
}

/**
 * @description: getNewCustomerRecordCountApi
 */
export function getNewCustomerRecordCountApi(params: NewCustomerRecordCountParams) {
  return defHttp.get({ url: Api.GetNewCustomerRecordCount, params });
}
