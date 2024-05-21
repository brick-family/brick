import { IBaseTenantEntity } from './base';

export interface ITenantFileEntity extends IBaseTenantEntity {
  name: string;
  originName: string;
  url: string;
  type: string;
  size: string;
}
