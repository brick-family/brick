import { Observable, observable } from '@legendapp/state';
import { IWorkflowEntity, IWorkflowNodeData, TNodeType } from '../types';
import { getNodeModule } from '../utils';
import { TNodeModuleMap } from '../components/common';
import { createGraphProcessor, GraphProcessor } from './poc';
import { generateSetObservable } from '@brick/core';

export class WorkflowAppProcessor {
  self: WorkflowAppProcessor;

  graphProcessor: GraphProcessor;

  workflowElement: HTMLElement | null;

  /**
   * node 节点相关内容
   */
  nodeModule: TNodeModuleMap;

  //工作留数据
  workflowData: Observable<IWorkflowEntity>;

  activeNode: Observable<IWorkflowNodeData | null>;

  constructor() {
    this.self = this;
    this.activeNode = observable(null);
    this.workflowData = observable({} as IWorkflowEntity);
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

  get setWorkflowDataObservable() {
    return generateSetObservable(this.workflowData!);
  }

  setActiveNodeById = (nodeId: string, type: TNodeType) => {
    let nodeData = this.workflowData.get()?.nodeMap?.[nodeId];
    if (!nodeData) {
      nodeData = {
        id: nodeId,
        type: type,
        config: this.nodeModule?.[type]?.defaultNodeConfigData || {},
      } as IWorkflowNodeData;

      this.setWorkflowDataObservable((draft) => {
        draft.nodeMap.set({ ...draft.nodeMap.get(), [nodeId]: nodeData });
      });
    }
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
