import { Observable, observable } from '@legendapp/state';
import { IWorkflowEntity, IWorkflowNodeData } from '../types';
import { getNodeModule } from '../utils';
import { TNodeModuleMap } from '../components/common';
import { createGraphProcessor, GraphProcessor } from './poc';

export class WorkflowAppProcessor {
  self: WorkflowAppProcessor;

  graphProcessor: GraphProcessor;

  workflowElement: HTMLElement | null;

  /**
   * node 节点相关内容
   */
  nodeModule: TNodeModuleMap;

  //工作留数据
  workflowData: Observable<IWorkflowEntity | null>;

  activeNode: Observable<IWorkflowNodeData | null>;

  constructor() {
    this.self = this;
    this.activeNode = observable(null);
    this.workflowData = observable(null);
    this.workflowElement = null;

    this.graphProcessor = createGraphProcessor().processor;
    this.nodeModule = getNodeModule();
  }

  setWorkflowElement = (element: HTMLDivElement) => {
    this.workflowElement = element;
  };

  /**
   * 设置workflow数据
   * @param data
   */
  setWorkflowData = (data: IWorkflowEntity) => {
    this.workflowData.set(data);
  };

  updateNodeData = (nodeData: any) => {
    // this.activeNode?.get().
  };

  setActiveNodeById = (nodeId: string) => {
    const nodeData = this.workflowData.get()?.nodeMap?.[nodeId];
    this.activeNode.set(nodeData);
  };

  /**
   * 清除激活的node
   */
  clearActiveNode = () => {
    this.activeNode.set(null);
  };

  isRead = () => {
    return true;
  };
}
