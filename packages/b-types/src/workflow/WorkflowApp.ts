/**
 * 工作流枚举类型  * - 1. 表单  2. 定时触发  3.自定义按钮 4.流程
 */
export enum EWorkflowType {
  /**
   * 流程
   */
  process = 4,
  /**
   * 表单
   */
  table = 1,
  /**
   * 定时触发
   */
  timing = 2,

  /**
   * 按钮
   */
  button = 3,
}

export enum EWorkflowStatus {
  enable = 1,
  disable = 0,
}

/**
 * 工作流类型
 */
export type TWorkflowType = keyof typeof EWorkflowType;

/**
 * 工作流布局单条数据结构
 */
export interface IWorkflowLayoutItem {
  id: string;
  children?: IWorkflowLayoutItem[];
}

export type TWorkflowLayouts = IWorkflowLayoutItem[];
