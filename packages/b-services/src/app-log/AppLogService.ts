import { IAppLogEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

export interface IQueryAppLogParams extends IQueryPage {
  // 操作人
  userName?: string;
  // 操作时间
  actionTime?: string;
  // 操作结果
  actionResult?: string;
  // 操作类型
  actionType?: string;
  // 应用对象
  appObject?: string;
}

/**
 * 获取应用列表
 * @returns
 */
export async function queryAppLogList(params: IQueryAppLogParams) {
  console.log('params111', params);
  return Request.get<Array<IAppLogEntity>>(`/log/page`, { params });
}
