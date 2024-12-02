import { IProcessNode } from '../workflow';

/**
 * 流程模型实体类
 */
export interface IFlowModelEntity {
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
   * 流程分类
   */
  category: string;
  /**
   * 流程xml
   */
  processModel: IProcessNode;

  /**
   * 版本
   */
  version: number;

  /**
   * 元数据信息,目前用来存工作流id"
   */
  metaInfo: string;
}

export enum EFlowModelStatus {
  /**
   * 设计中
   */
  DESIGNING = 1,
  /**
   * 使用中
   */
  USING = 2,
  /**
   * 历史
   */
  HISTORY = 3,
}

export type TFloeModelStatus = keyof typeof EFlowModelStatus;

export interface IFlowModelVo extends IFlowModelEntity {
  /**
   * 当前流程状态， 1 设计中 2 使用中 3 历史
   */
  status: EFlowModelStatus;
}
