import { IBaseEntity } from '../entity/base';
import { ITenantFileEntity } from '../entity/TenantFile';
import { TExtraParam } from './common';

/**
 * 客户企业信息
 */
export interface ITenantUserEntity extends IBaseEntity {
  // 名称
  name: string;

  /**
   * 描述
   */
  description: string;

  /**
   * logo
   */
  logo: string;

  /**
   * logo文件
   */
  logoFile?: ITenantFileEntity;

  /**
   * 过期时间
   */
  expireTime: string;

  /**
   * 联系人
   */
  contact: string;

  /**
   * 联系电话
   */
  contactPhone: string;

  /**
   * 启用状态 -- 1 启用，0 禁用
   */
  enable: number;

  // 扩展参数
  extraParams?: TExtraParam;
}
