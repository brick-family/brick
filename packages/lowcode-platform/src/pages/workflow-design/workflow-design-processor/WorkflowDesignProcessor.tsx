import { BaseProcessor } from '@brick/core';
import { createWorkflowProcessor, WorkflowProcessor } from '@brick/processor';

export class WorkflowDesignProcessor extends BaseProcessor {
  workflowProcessor: WorkflowProcessor;
  constructor() {
    super();
    this.workflowProcessor = createWorkflowProcessor().processor;
    // this.workflowProcessor = createWorkflowProcessor().processor;

    this.init();
  }
  private init = async () => {
    this.listeners();
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
