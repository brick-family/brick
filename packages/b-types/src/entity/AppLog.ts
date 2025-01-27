// TODO
// import { IIconData } from '/bcomponents';

import { IBaseEntity } from './base';

export interface IAppLogEntity extends IBaseEntity {
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

  // 操作状态
  success?: boolean;
}

export interface IAppLogData {
  countId: number | null;
  current: number;
  maxLimit: number | null;
  optimizeCountSql: boolean;
  orders: any[]; // 根据具体结构替换any
  pages: number;
  records: Array<IAppLogEntity>;
  searchCount: boolean;
  size: number;
  total: number;
  message: string;
}
