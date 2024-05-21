import { IBaseEntity } from './base/base';

export interface IRoleEntity extends IBaseEntity {
  // 名称
  name: string;
  //名称
  title: string;
  // desc
  description?: string;

  // 父id
  pid?: string;

  //id
  id?: string;
  /**
   * 是否分组 -- 1分组 0 是角色
   */
  isGroup?: number;
}
