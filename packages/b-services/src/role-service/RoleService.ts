import { IRoleEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 返回的内容
 */
export type IRoleResponse = IResponse<IRoleEntity>;

/**
 * 创建角色
 * @returns
 * @param role
 */
export async function createRole(role: IRoleEntity) {
  return Request.post('/role', role);
}

/**
 * 分页查询参数
 */
export interface IQueryRoleParams extends IQueryPage {
  search?: string;
}

/**
 * 分页查询role
 * @param param0
 * @returns
 */

export async function queryRole({ ...params }: IQueryRoleParams) {
  return Request.get<IRoleResponse>(`/role/page`, { params });
}

/**
 * 获取所有角色
 * @returns
 */
export async function queryRoleAll() {
  return Request.get<Array<IRoleEntity>>('/role/all');
}

/**
 *
 * @param 修改角色
 * @returns
 */
export async function updateRole(roleEntity: IRoleEntity) {
  return Request.put<boolean>(`/role`, roleEntity);
}

/**
 *
 * @param appId 删除角色
 * @returns
 */
export async function deleteRole(id: string) {
  return Request.delete<boolean>(`/role/${id}`);
}
