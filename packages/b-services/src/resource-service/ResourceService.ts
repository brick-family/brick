import {
  IBaseEntity,
  IResourceEntity,
  IResourceEntityIncludeResource,
  IResourceListVo,
  ResourceType,
  TSortMap,
} from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage } from '../types';

/**
 * 分页查询参数
 */
export interface IQueryResourceParams extends IQueryPage {
  // 应用id
  applicationId?: string;
}

export interface IGetResourceParams {
  // 应用id
  applicationId?: string;
  // table Id
  id: string;
}

/**
 * 创建分组
 * @param tableEntity
 * @returns
 */
export async function createResource(data: IResourceEntity) {
  return Request.post<IResourceEntity>(`/app/resource`, data);
  // return Request.put<IResourceEntity>(`/application/resource/save`, data);
}

/**
 * 获取资源列表 TODO: 可以去掉
 * @returns
 */
export async function queryResource(params: IQueryResourceParams) {
  return Request.get<IResourceEntity[]>(`/app/resource/`, { params });
}

/**
 * 获取资源分组内容分组
 * @returns
 */
export async function queryResourceGroup(params: IQueryResourceParams) {
  return Request.get<IResourceEntity[]>('/app/resource/getGroup', { params });
}

/**
 * 获取资源包含具体的资源实体
 * @param id
 */
export async function getResourceIncludeResource(id: string) {
  return Request.get<IResourceEntityIncludeResource>(`/app/resource/${id}/resource`);
}

/**
 * 获取资源
 * @param id
 */
export async function getResource(id: string) {
  return Request.get<IResourceEntity>(`/app/resource/${id}`);
}

/**
 * 获取所有资源
 */
export async function queryResourceAll() {
  return Request.get<IResourceListVo>('/app/resource/all');
}

/**
 * 根据类型获取资源
 * @param params
 */
export async function queryResourceByResourceType(params: {
  resourceType: ResourceType;
  appId?: string;
}) {
  return Request.get<IResourceEntity[]>(`/app/resource/query`, {
    params: params,
  });
}

/**
 * 修改资源
 * @param tableEntity
 * @returns
 */
export async function updateResource(resource: IResourceEntity) {
  return Request.put(`/app/resource`, resource);
}

/**
 * 删除资源
 * @param id
 * @returns
 */
export async function deleteResource(id: string) {
  return Request.delete<boolean>(`/app/resource/${id}`);
}

export interface IUpdateResourceSortParams {
  applicationId: string;
  sort: TSortMap;
  dragData: Pick<IResourceEntity, 'parentId'> & Pick<IBaseEntity, 'id'>;
}

export async function updateResourceSort(params: IUpdateResourceSortParams) {
  return Request.post<boolean>(`/app/resource/sort`, params);
}

// /**
//  * 获取一个表
//  * @param tableEntity
//  * @returns
//  */
// export async function getTable(params: IGetTableParams) {
//   return Request.get<ITableEntity>(`/application/table/get`, { params })
// }

// /**
//  * 获取分组
//  * @param tableEntity
//  * @returns
//  */
// export async function queryTableGroup(params: IQueryTableParams) {
//   return Request.get<ITableEntity[]>('/application/table/getGroup', {params})
// }
