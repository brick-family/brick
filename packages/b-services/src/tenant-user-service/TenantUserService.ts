import { ITenantUserEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage } from '../types';

/**
 * 分页查询参数
 */
export interface IQueryTenantUserParams extends IQueryPage {}

/**
 * 创建租户
 * @param ITenantUserEntity
 * @returns
 */
export async function createTenantUser(data: ITenantUserEntity) {
  return Request.post<boolean>(`/tenant`, data);
}

/**
 * @returns
 */
export async function queryTenantUser(params: IQueryTenantUserParams) {
  return Request.get<ITenantUserEntity[]>(`/tenant/page`, { params });
}

/**
 * 获取资源
 * @param id
 */
export async function getTenantUser(id: string) {
  return Request.get<ITenantUserEntity>(`/tenant/${id}`);
}

/**
 * 获取所有资源
 */
export async function queryTenantUserAll() {
  return Request.get<Array<ITenantUserEntity>>('/tenant/all');
}

/**
 * 修改资源
 * @param ITenantUserEntity
 * @returns
 */
export async function updateTenantUser(resource: ITenantUserEntity) {
  return Request.put(`/tenant`, resource);
}

/**
 * 删除资源
 * @param id
 * @returns
 */
export async function deleteTenantUser(id: string) {
  return Request.delete<boolean>(`/tenant/${id}`);
}
