import { IBaseEntity } from './base/base';

export interface IDeptEntity extends IBaseEntity {
  createTime?: string;
  createUser?: string;
  description?: string;
  id?: string;
  key?: string;
  isDeleted?: number;
  name?: string;
  pid?: string;
  sort?: number;
  updateTime?: string;
  updateUser?: string;
  level?: number | string;
}

export type IDeptListEntity = Array<IDeptEntity>;
