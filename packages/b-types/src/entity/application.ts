// TODO
// import { IIconData } from '/bcomponents';

import { IBaseEntity } from './base';

export type TAppId = string;

export interface IAppEntity extends IBaseEntity {
  id?: string;
  // 客户id
  tenantId: string;
  // 名称
  name: string;
  // 数据库信息
  dbKey?: string;
  // 配置应用链接
  url?: string;
  extraParam: {
    // icon 信息
    icon: any;
    // 描述信息
    description?: string;
  };
}
