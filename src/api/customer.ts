import request from '/@/utils/request';
import {
  CustomerListParams,
  DeleteCustomerParams,
  GetCustomerListModel,
  UpdateCustomerParams,
  NewCustomerCountParams,
} from './model/customerModel';

enum Api {
  GetCustomerList = '/user/getUserList',
  UpdateCustomer = '/user/addOrUpdate',
  DeleteCustomer = '/user/deleteUser',
  GetCustomerAnalyse = '/index/userDetail',
  GetNewCustomerCount = '/index/newUserCount',
}

/**
 * @description: getCustomerListApi
 */
export function getCustomerListApi(params?: CustomerListParams) {
  return request.post<GetCustomerListModel>({ url: Api.GetCustomerList, data: params });
}

/**
 * @description: updateCustomerApi
 */
export function updateCustomerApi(params?: UpdateCustomerParams) {
  return request.post({ url: Api.UpdateCustomer, data: params });
}

/**
 * @description: deleteCustomerApi
 */
export function deleteCustomerApi(params?: DeleteCustomerParams) {
  return request.get({ url: Api.DeleteCustomer, data: params });
}

/**
 * @description: getCustomerAnalyseApi
 */
export function getCustomerAnalyseApi() {
  return request.get({ url: Api.GetCustomerAnalyse });
}

/**
 * @description: getNewCustomerCountApi
 */
export function getNewCustomerCountApi(params: NewCustomerCountParams) {
  return request.get({ url: Api.GetNewCustomerCount, data: params });
}
