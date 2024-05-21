import { TOperatorCode } from '..';
import { IBaseEntity } from './base';

/**
 *  资源权限实体
 */
export interface IResourcePermEntity extends IBaseEntity {
  resourceId: string;

  name: string;

  description: string;

  isSystem: number;

  isEnable: number;

  viewFiledIds: Array<string>;

  editFiledIds: Array<string>;

  operateCode: Array<TOperatorCode>;

  dataCodeIds: string;
}
