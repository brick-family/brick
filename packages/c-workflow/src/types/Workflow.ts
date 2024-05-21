/**
 * 工作流枚举类型
 */
export enum EWorkflowType {
  /**
   * 流程
   */
  Process = 'Process',
  /**
   * 表单
   */
  Table = 'Table',
  /**
   * 定时触发
   */
  Timer = 'Timer',
}

/**
 * 工作流类型
 */
export type TWorkflowType = keyof typeof EWorkflowType;

/**
 * workflow 数据
 */
export type TWorkflowData = {
  id: string;
  type: TWorkflowType;
  /**
   * 画布数据
   */
  graphData: any;
};
