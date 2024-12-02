import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import {
  createFlowModelProcessor,
  createWorkflowProcessor,
  FlowModelProcessor,
  WorkflowProcessor,
} from '@brick/processor';
import { IFlowModelEntity, IWorkflowEntity, WorkflowAppProcessor } from '@brick/workflow';
import { Observable, observable } from '@legendapp/state';

export class ProcessPageProcessor extends BaseProcessor {
  currWorkflowData: Observable<IWorkflowEntity | null>;

  /**
   * 工作流api
   */
  private workflowProcessor: WorkflowProcessor;
  /**
   * app 实例相关的processor
   */
  workflowAppInstance: Observable<WorkflowAppProcessor | null>;

  /**
   * 流程模型api
   */
  private flowModelProcessor: FlowModelProcessor;

  /**
   * 当前选中的版本
   */
  selectVersion: Observable<IFlowModelEntity | null>;

  constructor() {
    super();
    this.workflowProcessor = createWorkflowProcessor().processor;
    this.flowModelProcessor = createFlowModelProcessor().processor;
    this.currWorkflowData = observable(null);
    this.workflowAppInstance = observable(null);
    this.selectVersion = observable(null);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 获取版本列表
   */
  get versionList() {
    return this.flowModelProcessor.queryFlowModelByKeyResponse.data;
  }

  setResourceId = (id: string) => {
    this.workflowProcessor.queryWorkflowParams.set({
      type: 1,
      refId: id,
    });

    // 获取版本列表
    this.flowModelProcessor.queryFlowModelByKey(id).then((res) => {
      this.selectVersion.set(res?.[0] || null);
    });
  };

  /**
   * 设置workflow app processor
   * @param workflowAppInstance
   */
  setWorkflowAppInstance = (workflowAppInstance: WorkflowAppProcessor) => {
    this.workflowAppInstance.set(workflowAppInstance);
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
