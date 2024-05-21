import { TExtraParam } from './common';

/**
 * 客户企业信息
 */
export interface ICustomerEntity {
  id?: number;
  // 名称
  name: string;

  // 扩展参数
  extraParams?: TExtraParam;
}
