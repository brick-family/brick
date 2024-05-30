import { IBaseNodeConfig } from './Node';

/**
 * 表事件类型
 */
export enum ETableEventType {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
}

export type ITableEventType = keyof typeof ETableEventType;

/**
 * 表单事件类型节点配置
 */
export interface ITableEventNodeConfig extends IBaseNodeConfig {
  /**
   * 触发方式
   */
  triggerEvent: Array<ITableEventType>;

  /**
   * 是否允许自动触发
   */
  auto: boolean;

  /**
   * 过滤器
   */
  filter: any;
}
