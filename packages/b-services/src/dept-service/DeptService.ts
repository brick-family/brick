import { IDeptEntity, TSortMap } from '@brick/types';
import { Request } from '@brick/utils';

/**
 * 获取用户信息
 * @returns
 */
export async function queryDeptAll() {
  return Request.get<Array<IDeptEntity>>(`/dept/all`);
}

/**
 * 新增用户信息
 * @returns
 */
export async function createDept(dept: IDeptEntity) {
  return Request.post(`/dept`, dept);
}

export interface IUpdateDeptSortParams {
  tenantId: string;
  sort: TSortMap;
  dragData: Pick<IDeptEntity, 'id' | 'pid'>;
}

export async function sortDept(params: IUpdateDeptSortParams) {
  return Request.post(`/dept/sort`, params);
}

/**
 * 修改部门
 * @param dept
 */
export async function updateDept(dept: IDeptEntity) {
  return Request.put(`/dept`, dept);
}

/**
 * 删除部门
 * @param deptId
 */
export async function deleteDept(deptId: string) {
  return Request.delete(`/dept/${deptId}`);
}
