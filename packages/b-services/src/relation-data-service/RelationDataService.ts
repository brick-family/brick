import { IRelationDataEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 返回的内容
 */
export type IRelationDataResponse = IResponse<IRelationDataEntity>;

/**
 * 创建数据
 * @param data
 */
export async function createRelationData(data: IRelationDataEntity) {
  return Request.post('', data);
}

/**
 * 分页查询参数
 */
export interface IQueryRelationDataParams extends IQueryPage {
  search?: string;
}

/**
 * 分页查询数据
 * @param params
 */
export async function queryRelationData({ ...params }: IQueryRelationDataParams) {
  return Request.get<IRelationDataResponse>(`/page`, { params });
}

/**
 * 获取单个数据
 * @param id
 */
export async function getRelationData(id: string) {
  return Request.get<IRelationDataEntity>(`/${id}`);
}

/**
 *
 * @param 修改数据
 * @returns
 */
export async function updateRelationData(data: IRelationDataEntity) {
  return Request.put<boolean>(``, data);
}

/**
 * 删除数据
 * @param id
 */
export async function deleteRelationData(id: string) {
  return Request.delete<boolean>(`/${id}`);
}
