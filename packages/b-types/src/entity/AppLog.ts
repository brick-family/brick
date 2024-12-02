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
}
