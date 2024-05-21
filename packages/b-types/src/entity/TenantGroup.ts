import { IBaseEntity } from './base';

/**
 * 租户管理组
 */
export interface ITenantGroupEntity extends IBaseEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * 扩展参数
   */
  extraParam: Record<string, any>;

  /**
   * 是否是系统管理组
   */
  isSystem: 1 | 0;

  /**
   * 操作权限code
   */
  operateCode: string[];

  /**
   * 能管理的部门
   */
  deptManagerIds: Array<String>;

  /**
   * 能管理的角色
   */
  roleManagerIds: Array<String>;
}
