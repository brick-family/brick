import { ICustomerEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 分页查询参数
 */
export interface IQueryCustomerParams extends IQueryPage {}

export interface IGetCustomerParams {
  // 应用id
  applicationId?: string;
  // customerId
  id: string;
}

/**
 * 返回的内容
 */
export type ICustomerResponse = IResponse<ICustomerEntity>;

export const CustomerQueryKey = 'customer';

/**
 * 创建一个表
 * @param customerEntity
 * @returns
 */
export async function create(customerEntity: ICustomerEntity) {
  return Request.post('/sys/customer', customerEntity);
}

/**
 * 修改一个表
 * @param customerEntity
 * @returns
 */
export async function update(customerEntity: ICustomerEntity) {
  return Request.put(`/sys/customer/${customerEntity.id}`, customerEntity);
}

/**
 * 修改一个表
 * @param customerEntity
 * @returns
 */
export async function query(params: IQueryCustomerParams) {
  return Request.get<ICustomerResponse>(`/sys/customer`, { params });
}

/**
 * 获取一个表
 * @param customerEntity
 * @returns
 */
export async function get(params: IGetCustomerParams) {
  return Request.get<ICustomerResponse>(`/sys/customer`, { params });
}
