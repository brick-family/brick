import { IProcessNode } from '../entity';

/**
 * 流程xml模型
 */
export interface IProcessXMLModel {
  /**
   * 流程定义id
   */
  id: string;
  /**
   * 流程名称
   */
  name: string;
  /**
   * 版本
   */
  version: number;

  /**
   * 流程xml
   */
  process: IProcessNode;

  /**
   * 排序
   */
  sort?: string;
  /**
   * 描述
   */
  remark?: string;
}
