import { IDataEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 数据过滤器表达式
 */
export interface IDataFilterExpression {
  /**
   * 字段信息
   */
  field: string;

  /**
   * 操作符号
   */
  op: string;

  /**
   * 当前的value
   */
  value: any;

  /**
   * 逻辑操作符
   */
  logicOp: 'AND' | 'OR';
}
/**
 * 分页查询参数
 */
export interface IQueryDataParams extends IQueryPage {
  /**
   * tableId
   */
  tableId: string;
  /**
   * 搜索
   */
  keywords?: string;

  /**
   * filter
   */
  filterExpressionList?: IDataFilterExpression[];
}

export interface IGetDataParams {
  // table Id
  tableId: string;
  // item id
  id: string;
}

/**
 * 返回的内容
 */
export type IDataResponse = IResponse<IDataEntity>;

export const DataQueryKey = 'data';

export interface IDataParams {
  tableId: string;
  data: IDataEntity;
}

export interface IIUpdateDataParams extends IDataParams {
  // 当前item id
  id: string;
}

export interface IDeleteDataParams extends IGetDataParams {}

/**
 * 添加一条数据
 * @param tableEntity
 * @returns
 */
export async function createData(params: IDataParams) {
  return Request.post(`/application/${params.tableId}/data`, params.data);
}

/**
 * 获取一条数据
 * @param params
 * @returns
 */
export async function getData(params: IGetDataParams) {
  return Request.get<IDataEntity>(`/application/${params.tableId}/data/${params.id}`);
}

/**
 * 分页获取数据
 * @param params
 * @returns
 */
export async function queryData(params: IQueryDataParams) {
  const { tableId, ...otherParams } = params;
  return Request.post<IDataResponse>(`/application/${params.tableId}/data/page`, otherParams);
}

/**
 * 修改一条数据
 * @param dataEntity
 * @returns
 */
export async function updateData(params: IDataParams) {
  return Request.put(`/application/${params.tableId}/data/${params?.data?.id}`, params.data);
}

/**
 * 删除一条数据
 * @param params
 * @returns
 */
export async function deleteData(params: IDeleteDataParams) {
  return Request.delete(`application/${params.tableId}/data/${params.id}`);
}

export interface IBatchDeleteDataParams {
  tableId: string;

  /**
   * 删除的ids
   */
  ids?: Array<string>;

  /**
   * filter 条件，
   */
  exceptions?: Array<any>;
}

/**
 * 批量删除数据
 * @param params
 */
export async function batchDeleteData(params: IBatchDeleteDataParams) {
  const { tableId, ...otherParams } = params;
  return Request.post(`/application/${tableId}/data/batchDelete`, otherParams);
}
