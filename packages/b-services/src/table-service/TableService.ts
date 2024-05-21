import { ITableEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 分页查询参数
 */
export interface IQueryTableParams extends IQueryPage {
  // 应用id
  applicationId?: string;
}

export interface IGetTableParams {
  /**
   * 表id
   */
  id: string;

  /**
   * 是否包含schema
   */
  hasSchema?: boolean;
}

/**
 * 返回的内容
 */
export type ITableResponse = IResponse<ITableEntity>;

export const TableQueryKey = 'table';

/**
 * 创建一个表
 * @param tableEntity
 * @returns
 */
export async function createTable(tableEntity: ITableEntity) {
  return Request.post('/table/table', tableEntity);
}

/**
 * 修改一个表
 * @param tableEntity
 * @returns
 */
export async function updateTable(tableEntity: ITableEntity) {
  return Request.put(`/table/save`, tableEntity);
}

/**
 * 只修改表信息，不修改列
 * @param tableEntity
 */
export async function updateOnlyTable(tableEntity: ITableEntity) {
  return Request.put('/table/update', tableEntity);
}

// /**
//  * 修改一个表
//  * @param tableEntity
//  * @returns
//  */
// export async function queryTable(params: IQueryTableParams) {
//   return Request.get<ITableEntity[]>(`/application/table/`, { params });
// }

/**
 * 获取所有表
 */
export async function queryTableAll(appId?: string) {
  return Request.get<ITableEntity[]>(`/table/all`);
}

/**
 * 获取一个表
 * @param tableEntity
 * @returns
 */
export async function getTable(params: IGetTableParams) {
  return Request.get<ITableEntity>(`/table/get`, { params });
}

/**
 * 获取默认值
 * @param tableId
 * @returns
 */
export async function getTableDefaultValue(tableId: string) {
  return Request.get<ITableEntity>(`/table/${tableId}/defaultValue`);
}
