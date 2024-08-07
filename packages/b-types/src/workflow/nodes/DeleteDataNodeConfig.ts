import { IBaseNodeConfig } from '@brick/types';

/**
 * 删除数据节点配置
 */
export interface IDeleteDataNodeConfig extends IBaseNodeConfig {
  appId: string;

  tableId: string;

  /**
   * 过滤器
   */
  filter: any;
}
