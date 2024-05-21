import { IBaseEntity } from './base/base';

export interface IUserEntity extends IBaseEntity {
  id: string;
  // 名称
  name: string;

  realName: string;

  /**
   * 手机号
   */
  phoneNumber: string;

  email?: string;

  // 1=启用 2=禁用
  status: number;
}
