import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import {
  createFlowModelProcessor,
  createWorkflowProcessor,
  FlowModelProcessor,
  WorkflowProcessor,
} from '@brick/processor';
import {
  IFlowModelEntity,
  IFlowModelVo,
  IWorkflowEntity,
  WorkflowAppProcessor,
} from '@brick/workflow';
import { batch, Observable, observable } from '@legendapp/state';

export class ProcessPageProcessor extends BaseProcessor {
  /**
   * 资源id，也就是表Id
   */
  resourceId: Observable<string | null>;

  /**
   * 当前工作流id
   */
  workflowId: Observable<string | null>;
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
  selectVersion: Observable<IFlowModelVo | null>;

  /**
   * 最大版本号
   */
  maxVersion: Observable<number>;

  constructor() {
    super();
    this.workflowProcessor = createWorkflowProcessor().processor;
    this.flowModelProcessor = createFlowModelProcessor().processor;
    this.workflowAppInstance = observable(null);
    this.selectVersion = observable(null);
    this.maxVersion = observable(0);
    this.workflowId = observable(null);
    this.resourceId = observable(null);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 获取流程列表
   */
  getProcessList = (id?: string) => {
    const key = id || this.resourceId.get();
    if (!key) {
      return;
    }
    // 获取版本列表
    this.flowModelProcessor.queryFlowModelByKey(key).then((res) => {
      batch(() => {
        const workflowId = this.workflowId.get();
        const selectVersion =
          (workflowId && res.find((f) => f.metaInfo === workflowId)) || res?.[0] || null;
        // 从response中获取最大版本号
        const maxVersion = Math.max(...res.map((model) => model.version));
        this.maxVersion.set(maxVersion || 0);
        this.selectVersion.set(selectVersion);
      });
    });
  };

  /**
   * 获取版本列表
   */
  get versionList() {
    return this.flowModelProcessor.queryFlowModelByKeyResponse.data;
  }

  /**
   * 获取当前工作流信息
   */
  get currWorkflowData() {
    return this.workflowProcessor.getWorkflowResponse.data;
  }

  setWorkflowId = (wid: string) => {
    this.workflowId.set(wid);
    this.workflowProcessor.getWorkflow(wid);
  };

  setResourceId = (id: string) => {
    // this.setResourceId(id);
    this.getProcessList(id);
  };

  setSelectVersion = (version: IFlowModelVo) => {
    this.selectVersion.set(version);
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
    // this.workflowProcessor.workflowList.data.onChange((changeData) => {
    //   const first = changeData.value?.[0];
    //   if (first) {
    //     this.currWorkflowData.set(first);
    //   }
    // });
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
