import {
  BaseProcessor,
  createDefaultResponseQuery,
  generateSetObservable,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { observable, Observable } from '@legendapp/state';
import { EWorkflowType, IWorkflowEntity } from '@brick/types';
import {
  createWorkflow,
  deleteWorkflow,
  getWorkflow,
  IQueryWorkflowPageParams,
  IQueryWorkflowParams,
  queryWorkflowAll,
  updateWorkflow,
} from '@brick/services';

const initQueryWorkflowParams = {
  type: EWorkflowType.table,
  refId: '',
  status: undefined,
  search: '',
};

export class WorkflowProcessor extends BaseProcessor {
  /**
   * 工作流啊列表
   */
  workflowList: Observable<IResponseQuery<Array<IWorkflowEntity>>>;

  /**
   * 查询所有数据的请求参数
   */
  queryWorkflowParams: Observable<IQueryWorkflowParams>;

  /**
   * 工作流列表请求参数
   */
  queryWorkflowPageParams: Observable<IQueryWorkflowPageParams>;

  createWorkflowResponse: TObservableResponse<boolean>;

  deleteWorkflowResponse: TObservableResponse<boolean>;

  updateWorkflowResponse: TObservableResponse<boolean>;

  getWorkflowResponse: TObservableResponse<IWorkflowEntity>;

  constructor() {
    super();
    this.workflowList = createDefaultResponseQuery();
    this.queryWorkflowPageParams = observable({
      pageSize: 10,
      currentPage: 1,
    } as IQueryWorkflowPageParams);

    this.queryWorkflowParams = observable<IQueryWorkflowParams>(initQueryWorkflowParams);

    this.createWorkflowResponse = createDefaultResponseQuery();
    this.deleteWorkflowResponse = createDefaultResponseQuery();
    this.updateWorkflowResponse = createDefaultResponseQuery();
    this.getWorkflowResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 请求当前应用角色数据
   * @returns
   */
  get requestWorkflowListAll() {
    return withProcessorServiceWrapper(async () => {
      return queryWorkflowAll(this.queryWorkflowParams.peek());
    }, this.workflowList);
  }

  /**
   * 设置查询所有的工作流的参数
   */
  get setQueryWorkflowParamsObservable() {
    return generateSetObservable(this.queryWorkflowParams);
  }

  /**
   * 创建资源
   */
  get createWorkflow() {
    return withProcessorServiceWrapper(createWorkflow, this.createWorkflowResponse);
  }

  /**
   * 修改资源
   */
  get updateWorkflow() {
    return withProcessorServiceWrapper(updateWorkflow, this.updateWorkflowResponse);
  }

  /**
   * 删除资源
   */
  get deleteWorkflow() {
    return withProcessorServiceWrapper(deleteWorkflow, this.deleteWorkflowResponse);
  }

  get getWorkflow() {
    return withProcessorServiceWrapper(getWorkflow, this.getWorkflowResponse);
  }

  /**
   * 刷新数据
   */
  refresh = async () => {
    await this.requestWorkflowListAll();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.queryWorkflowParams.onChange(async (changeData) => {
      // 重新查询工作流参数
      await this.requestWorkflowListAll();
    });
  };
}

export const createWorkflowProcessor = () => {
  let processor: null | WorkflowProcessor = new WorkflowProcessor();

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

export const workflowProcessor = createWorkflowProcessor().processor;
