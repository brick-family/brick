import { IBaseEntity } from '../entity/base/base';
import { TExtraParam } from './common';
import { ITableEntity } from './table/Table';

/**
 * 资源类型枚举
 */
export enum EResourceType {
  'TABLE' = 'TABLE',
  'GROUP' = 'GROUP',
  'PROGRESS_TABLE' = 'PROGRESS_TABLE',
}

/**
 * 资源类型
 */
export type ResourceType = keyof typeof EResourceType;

export interface IResourceEntity extends IBaseEntity {
  // 名称
  title: string;

  // 应用id
  applicationId?: string;

  // 资源信息
  resourceType: ResourceType;

  // 父级id
  parentId?: string;

  // 扩展参数
  extraParam?: TExtraParam;
}

export type TResourceMap = {
  [EResourceType.TABLE]: ITableEntity;
  [EResourceType.GROUP]: null;
};

/**
 * 包换资源实体类型
 */
export interface IResourceEntityIncludeResource<T extends EResourceType = EResourceType>
  extends IResourceEntity {
  resource: TResourceMap[T];
}
