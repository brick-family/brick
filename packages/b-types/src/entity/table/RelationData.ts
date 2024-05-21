import { IBaseEntity } from '@brick/types';

export interface IRelationDataEntity extends IBaseEntity {
  /**
   * 当前数据id
   */
  dataId: string;

  /**
   * 当前表的关联的字段id
   */
  columnId: string;

  /**
   * 关联数据id
   */
  relationId: string;
}
