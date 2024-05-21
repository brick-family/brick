import { IAppEntity, IUserEntity } from '@brick/types';

/**
 * 租户分组用户应用Vo
 */
export interface ITenantGroupUserAppVo {
  userList: IUserEntity[];
  appList: IAppEntity[];
}
