/**
 * 节点类型枚举
 */
export enum ENodeType {
  /**
   * 表单事件类型节点
   */
  TableEvent = 'TableEvent',
  AddData = 'AddData', //添加节点
  UpdateData = 'UpdateData', //修改节点
  GetOneData = 'GetOneData', //获取一条数据
  GetMoreData = 'GetMoreData', //获取多条数据
  DeleteData = 'DeleteData', //删除数据

  /**
   * 人工节点
   */
  SendAudit = 'SendAudit', //发送审批

  End = 'End', //结束节点类型
}

/**
 * 节点类型
 */
export type TNodeType = keyof typeof ENodeType;

export interface INodeData<T extends TNodeType = TNodeType> {
  /**
   * 节点id
   */
  id: string;

  /**
   * 类型
   */
  type: T;

  /**
   * 配置
   */
  config: INodeDataConfig<T>;
}

export interface INodeDataConfig<T extends TNodeType = TNodeType> {}

export interface INodeDataConfigByTable extends INodeDataConfig {
  eventType: 'create' | 'update' | 'delete';
  filter: any;
}

/**
 * 选择面板数据类型
 */
export interface IPanelDataNode {
  id: string;
  type: TNodeType;
  label: string;
  icon: any;
}
