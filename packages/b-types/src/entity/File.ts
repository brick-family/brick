import { IBaseEntity } from './base';

export interface IFileEntity extends IBaseEntity {
  appId: string;
  name: string;
  originName: string;
  url: string;
  type: string;
  size: string;
}
