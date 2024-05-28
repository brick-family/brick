import { BaseProcessor } from '@brick/core';
import { createWorkflowProcessor, WorkflowProcessor } from '@brick/processor';
import { WorkflowAppProcessor } from '@brick/workflow';

export class WorkflowDesignProcessor extends BaseProcessor {
  /**
   * 接口请求相关
   */
  workflowProcessor: WorkflowProcessor;

  /**
   * app 实例相关的processor
   */
  workflowAppInstance: WorkflowAppProcessor | null;

  constructor() {
    super();
    this.workflowProcessor = createWorkflowProcessor().processor;
    this.workflowAppInstance = null;
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 设置workflow app processor
   * @param workflowAppInstance
   */
  setWorkflowAppInstance = (workflowAppInstance: WorkflowAppProcessor) => {
    this.workflowAppInstance = workflowAppInstance;
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createWorkflowDesignProcessor = () => {
  let processor: null | WorkflowDesignProcessor = new WorkflowDesignProcessor();

  const getRoot = () => {
    return processor;
  };
  const destroy = () => {
    processor = null;
  };

  return {
    processor,
    getRoot,
    destroy,
  };
};
