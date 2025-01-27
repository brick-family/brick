import { IAppLogData } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

export interface IQueryAppLogParams extends IQueryPage {
  // 操作人
  userName?: string;
  // 开始时间
  startCreateTime?: string;
  // 结束时间
  endCreateTime?: string;
  // 操作状态
  success?: string;
  // 操作类型
  operationType?: string;
}

/**
 * 获取应用列表
 * @returns
 */
export async function queryAppLogList(params: IQueryAppLogParams) {
  return Request.get<IAppLogData>(`/log/page`, { params });
}

/**
 * 获取操作人列表
 * @returns
 */
export async function getCreateUserList() {
  return Request.get<Array<string>>(`/log/createUserList`);
}

/**
 * 获取操作类型列表
 * @returns
 */
export async function getOperationTypeList() {
  return Request.get<Array<string>>(`/log/operationTypeList`);
}

/**
 * 删除应用日志
 */
export async function deleteAppLog(id: string) {
  return Request.delete(`/log/${id}`);
}
