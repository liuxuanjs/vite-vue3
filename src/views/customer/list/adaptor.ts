import { CustomerListParams } from '/@/api/model/customerModel';
import { ageMap } from '/@/enums/user/age';
import { isNumber } from '/@/utils/is';

export const getParams = (pagination, options) => {
  const { age, sex, userName, status } = options;

  const { pageSize, current } = pagination;

  const { min, max } = ageMap[age || 0] || {};

  const params: CustomerListParams = { pageNum: current, pageSize };

  if (sex) params.sex = sex;
  if (userName) params.userName = userName.trim();
  if (isNumber(min)) params.min = min;
  if (isNumber(max)) params.max = max;
  if (status) params.status = status;

  return params;
};
