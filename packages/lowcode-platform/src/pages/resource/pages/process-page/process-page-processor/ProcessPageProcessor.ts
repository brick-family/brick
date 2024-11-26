import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import { createWorkflowProcessor, WorkflowProcessor } from '@brick/processor';
import { IWorkflowEntity, WorkflowAppProcessor } from '@brick/workflow';
import { Observable, observable } from '@legendapp/state';

export class ProcessPageProcessor extends BaseProcessor {
  currWorkflowData: Observable<IWorkflowEntity | null>;

  /**
   * 工作流api
   */
  private workflowProcessor: WorkflowProcessor;
  constructor() {
    super();
    this.workflowProcessor = createWorkflowProcessor().processor;
    this.currWorkflowData = observable(null);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  // get workflowList() {
  //   return this.workflowProcessor.workflowList?.data;
  // }

  setResourceId = (id: string) => {
    this.workflowProcessor.queryWorkflowParams.set({
      type: 1,
      refId: id,
    });
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.workflowProcessor.workflowList.data.onChange((changeData) => {
      const first = changeData.value?.[0];
      if (first) {
        this.currWorkflowData.set(first);
      }
    });
  };
}

export const createProcessPageProcessor = () => {
  let processor: null | ProcessPageProcessor = new ProcessPageProcessor();

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
