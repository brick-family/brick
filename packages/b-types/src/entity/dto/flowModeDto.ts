import { IProcessNode } from '../workflow';

/**
 * 流程模型实体类
 */
export interface IFlowModelDto {
  /**
   * 流程定义id
   */
  id: string;
  /**
   * 流程名称
   */
  name: string;
  /**
   * 流程key
   */
  key: string;

  /**
   * 流程xml
   */
  processModel: IProcessNode;

  /**
   * 是否保存为新版本
   */
  newVersion: boolean;
}
