import { IBaseEntity } from './base';
import { IResourceEntity } from './resource';
import { IWorkflowNodeData } from '../workflow';

export interface IWorkflowEntity extends IBaseEntity {
  applicationId: string;
  name: string;
  type: number;
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

  /**
   * 配置信息
   */
  nodeMap: Record<string, IWorkflowNodeData>;

  /**
   * 拓扑信息
   */
  graph: any;

  /**
   * lite flow el配置
   */
  elData: string;

  /**
   * 扩展参数
   */
  extraParam: any;
}
