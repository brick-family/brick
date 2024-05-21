import { IAppEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 分页查询参数
 */
export interface IQueryApplicationParams extends IQueryPage {
  search?: string;
}

/**
 * 返回的内容
 */
export type IApplicationResponse = IResponse<IAppEntity>;

export async function createApplication(appEntity: IAppEntity) {
  return Request.post(`/application`, appEntity);
}

export async function queryApplication({ ...params }: IQueryApplicationParams) {
  return Request.get<IApplicationResponse>(`/application/page`, {
    params,
  });
}

export async function queryAppList() {
  return Request.get<Array<IAppEntity>>(`/application/all`);
}

/**
 *
 * @param appId 根据id获取应用
 * @returns
 */
export async function getApplication(appId: string) {
  return Request.get<IAppEntity>(`/application/${appId}`);
}

/**
 *
 * @param 修改应用
 * @returns
 */
export async function updateApplication(appEntity: IAppEntity) {
  return Request.put<IAppEntity>(`/application/${appEntity.id}`, appEntity);
}

export interface IDeleteApplicationParams {
  appId: string;
}

/**
 *
 * @param appId 删除应用
 * @returns
 */
export async function deleteApplication(params: IDeleteApplicationParams) {
  return Request.delete<boolean>(`/application/${params.appId}`);
}
