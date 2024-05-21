import { IBaseEntity } from './base';
import { IResourceEntity } from './resource';

export enum EWorkflowType {
  /**
   * 表单时间
   */
  'table' = 1,
  /**
   * 定时触发
   */
  'timing' = 2,
  /**
   * 按钮事件
   */
  'button' = 3,
}

/**
 *  流程状态
 */
export enum EWorkflowStatus {
  'enable' = 1,
  'disable' = 0,
}

export type TWorkflowStatus = keyof typeof EWorkflowStatus;

export type TWorkflowType = keyof typeof EWorkflowType;

export interface IWorkflowEntity extends IBaseEntity {
  applicationId: string;
  name: string;
  type: TWorkflowType;
  /**
   *  表单id/定时任务id/按钮id
   */
  refId: string;

  /**
   * 引用数据
   */
  refData?: IResourceEntity;

  /**
   * 状态
   * @description  --1 启用，0 禁用，
   */
  status: number;
  config: any;
  extra_param: any;
}
