import {
  IDeptEntity,
  IResourcePermEntity,
  IRoleEntity,
  IUserEntity,
} from '@brick/types';
import { Request } from '@brick/utils';
import { IResponse } from '../types';

export const resourceTypeList = [];

/**
 * 创建资源权限组
 * @returns
 * @param resourcePerm
 */
export async function createResourcePerm(resourcePerm: IResourcePermEntity) {
  return Request.post<boolean>('/resource/perm', resourcePerm);
}

export interface IResourcePermBindDto {
  /**
   *  资源类型，user-用户，role-角色，dept-部门
   */
  type: 'user' | 'role' | 'dept';
  /**
   * 选中的资源id数组
   */
  ids: string[];
  /**
   *  权限组id
   */
  permId: string;
}

/**
 * 为权限组绑定用户，角色，部门
 * @param resourcePermBindDto
 */
export async function resourcePermBind(
  resourcePermBindDto: IResourcePermBindDto,
) {
  return Request.post('/resource/perm/bind', resourcePermBindDto);
}

export interface IResourcePermUnBindDto {
  /**
   *  资源类型，user-用户，role-角色，dept-部门
   */
  type: 'user' | 'role' | 'dept';
  /**
   * 当前要解绑的id
   */
  id: string;
  /**
   *  权限组id
   */
  permId: string;
}

/**
 *  解绑权限组中的用户，角色，部门
 * @param resourcePermUnBindDto
 */
export async function resourcePermUnBind(
  resourcePermUnBindDto: IResourcePermUnBindDto,
) {
  return Request.post<boolean>('/resource/perm/unbind', resourcePermUnBindDto);
}

/**
 * 修改资源权限组
 * @param resourcePerm
 */
export async function updateResourcePerm(resourcePerm: IResourcePermEntity) {
  return Request.put<boolean>('/resource/perm', resourcePerm);
}

export interface IResourcePermListVo {
  useList: IUserEntity[];
  roleList: IRoleEntity[];
  deptList: IDeptEntity[];
  resourcePermEntity: IResourcePermEntity;
}

/**
 * 根据资源id获取权限组列表
 * @param resourceId
 */
export async function getListByResourceId(resourceId: string) {
  return Request.get<Array<IResourcePermListVo>>(
    `/resource/perm/list/${resourceId}`,
  );
}

/**
 * 删除资源项
 * @param id
 * @returns
 */
export async function deleteResourcePerm(id: string) {
  return Request.delete<boolean>(`/resource/perm/${id}`);
}
/**
 * 返回的内容
 */
export type IResourcePermResponse = IResponse<IResourcePermEntity>;
