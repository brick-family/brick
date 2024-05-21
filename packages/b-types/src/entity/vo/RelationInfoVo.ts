import { IRelationInfoEntity } from '../table/RelationInfo';
import { IColumnEntity, IResourceEntity } from '@brick/types';

/**
 * 关联VO
 */
export interface IRelationInfoVo extends IRelationInfoEntity {
  /**
   * 表格信息
   */
  resourceEntity: IResourceEntity;
  /**
   * 列信息
   */
  columnEntity: IColumnEntity;
}
