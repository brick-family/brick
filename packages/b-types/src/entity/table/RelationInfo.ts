import { IBaseEntity } from '@brick/types';

export interface IRelationInfoEntity extends IBaseEntity {
  /**
   * 当前表的id
   */
  tableId: string;
  /**
   * 当前表的关联的字段id
   */
  columnId: string;
  /**
   * 关联的表的id
   */
  relationTableId: string;
}
