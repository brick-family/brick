import { ITableEventNodeConfig } from './TableEventNodeConfig';
import { IAddDataNodeConfig } from './AddDataNodeConfig';

/**
 * 节点类型枚举
 */
export enum ENodeType {
  /**
   * 表单事件类型节点
   */
  TableEvent = 'TableEvent',
  AddData = 'AddData', //添加节点
  AddOneData = 'AddOneData', //新增单条数据
  UpdateData = 'UpdateData', //修改节点
  GetOneData = 'GetOneData', //获取一条数据
  GetMoreData = 'GetMoreData', //获取多条数据
  DeleteData = 'DeleteData', //删除数据

  /**
   * 人工节点
   */
  SendAudit = 'SendAudit', //发送审批

  // 逻辑控制节点

  /**
   * 条件节点
   */
  Condition = 'Condition',

  /**
   * 具体的条件子节点
   */
  ConditionItem = 'ConditionItem',
  /**
   * 循环节点
   */
  Loop = 'Loop',

  End = 'End', //结束节点类型

  /**
   * 占位节点
   */
  Placeholder = 'Placeholder',
}

/**
 * 节点类型
 */
export type TNodeType = keyof typeof ENodeType;

export interface IWorkflowNodeData<T extends TNodeType = TNodeType> {
  /**
   * 节点id
   */
  id: string;

  /**
   * 类型
   */
  type: T;

  /**
   * 标题
   */
  name: string;

  /**
   * icon
   */
  icon: string;

  /**
   * 配置
   */
  config: T extends keyof TNodeTypeConfigMap ? TNodeTypeConfigMap[T] : IBaseNodeConfig;
}

/**
 * node 节点配置映射
 */
export type TNodeTypeConfigMap = {
  [ENodeType.TableEvent]: ITableEventNodeConfig;
  [ENodeType.AddData]: IAddDataNodeConfig;
};

export interface IBaseNodeConfig {}

/**
 * 选择面板数据类型
 */
export interface IPanelDataNode {
  id: string;
  type: TNodeType;
  label: string;
  icon: any;
}

/**
 * 节点校验结果
 */
export interface INodeValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * 错误节点信息
 */
export interface IErrorNodeInfo {
  id: string;
  info: INodeValidationResult;
}
