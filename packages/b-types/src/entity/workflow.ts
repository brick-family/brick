import { IBaseEntity } from './base';
import { IResourceEntity } from './resource';
import { IWorkflowNodeData, TNodeType, TWorkflowLayouts } from '../workflow';

/**
 * 流程数据
 */
export interface IProcessNode {
  // 节点id
  id: string;
  // 父节点id
  pid?: string;
  // 节点名称
  name: string;

  type: TNodeType;
  // 事件监听器
  executionListeners?: any[];
  // 子节点
  child?: IProcessNode;
  branchId?: string;
}

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
   * 版本号
   */
  version: number;

  /**
   * 配置信息
   */
  nodeMap: Record<string, IWorkflowNodeData>;

  /**
   * 拓扑信息
   */
  graph: TWorkflowLayouts;

  /**
   * 流程节点数据
   */
  processNodeData: IProcessNode;

  /**
   * 扩展参数
   */
  extraParam: any;
}
