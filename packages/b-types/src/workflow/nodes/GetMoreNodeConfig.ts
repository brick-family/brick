import { IBaseNodeConfig } from '@brick/types';

/**
 * 获取更多数据
 */
export interface IGetMoreDataNodeConfig extends IBaseNodeConfig {
  appId: string;

  tableId: string;

  /**
   * 过滤器
   */
  filter: any;
}
