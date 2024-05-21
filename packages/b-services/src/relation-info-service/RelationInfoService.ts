import { IRelationInfoEntity, IRelationInfoVo } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 返回的内容
 */
export type IRelationInfoResponse = IResponse<IRelationInfoEntity>;

/**
 * 创建数据
 * @param data
 */
export async function createRelationInfo(data: IRelationInfoEntity) {
  return Request.post('/relation/info', data);
}

/**
 * 分页查询参数
 */
export interface IQueryRelationInfoParams extends IQueryPage {
  search?: string;
}

/**
 * 分页查询数据
 * @param params
 */
export async function queryRelationInfo({ ...params }: IQueryRelationInfoParams) {
  return Request.get<IRelationInfoResponse>(`/relation/info/page`, { params });
}

/**
 * 获取单个数据
 * @param id
 */
export async function getRelationInfoByTableId(id: string) {
  return Request.get<Array<IRelationInfoVo>>(`/relation/info/${id}`);
}

/**
 *
 * @param 修改数据
 * @returns
 */
export async function updateRelationInfo(data: IRelationInfoEntity) {
  return Request.put<boolean>(`/relation/info`, data);
}

/**
 * 删除数据
 * @param id
 */
export async function deleteRelationInfo(id: string) {
  return Request.delete<boolean>(`/relation/info/${id}`);
}
