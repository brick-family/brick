import { IBaseNodeConfig } from './Node';

export enum ENAddDataType {
  /**
   * 单条
   */
  'single' = 'single',

  /**
   * 多条
   */

  'multiple' = 'multiple',
}

export type TAddDataType = keyof typeof ENAddDataType;

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

  /**
   * 添加数据方式
   */
  type: TAddDataType;
}
