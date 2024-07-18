import { IBaseNodeConfig } from '@brick/types';

/**
 * 表单事件类型节点配置
 */
export interface IGetOneDataNodeConfig extends IBaseNodeConfig {
  appId: string;

  tableId: string;

  /**
   * 过滤器
   */
  filter: any;
}
