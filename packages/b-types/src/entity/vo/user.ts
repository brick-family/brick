import { IAppEntity } from '../application';
import { ITenantUserEntity } from '../tenantUser';
import { IUserEntity } from '../user';
import { TAppPermMap } from './PermVo';

export interface IUserInfoVo {
  token: string;
  user: IUserEntity;
  tenantList: Array<ITenantUserEntity>;
  app: IAppEntity;
  /**
   * 是否是管理员
   */
  isAdmin: boolean;

  /**
   * app相关权限
   */
  appPerm: TAppPermMap;
}

export interface Test {}
