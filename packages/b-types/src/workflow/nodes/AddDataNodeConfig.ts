import { IBaseNodeConfig } from './Node';

/**
 * 添加数据config
 */
export interface IAddDataNodeConfig extends IBaseNodeConfig {
  /**
   * 选择的应用id
   */
  appId: string;
  /**
   * 选择的表id
   */
  tableId: string;

  /**
   * 默认值
   */
  defaultValues: Record<string, any>;
}
