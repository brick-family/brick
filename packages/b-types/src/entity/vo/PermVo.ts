import { TAppId } from '@brick/types';

export interface IAppPermVo {
  /**
   * 应用id
   */
  applicationId: string;
  /**
   * 权限列表
   */
  rights: string[];
  /**
   * 可管理的部门列表
   */
  deptIds: string[];
  /**
   * 可管理的角色列表
   */
  roleIds: string[];
}

/**
 * 应用权限map， key为应用id
 */
export type TAppPermMap = Record<TAppId, IAppPermVo>;
