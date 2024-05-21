import { IBaseEntity } from './base';

export interface IBaseTenantEntity extends IBaseEntity {
  /**
   * 租户ID
   */
  tenantId: string;
}
