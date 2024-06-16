import { observable, Observable } from '@legendapp/state';
import { IWorkflowEntity, IWorkflowNodeData, TNodeType } from '../types';
import { getNodeModule } from '../utils';
import { TNodeModuleMap } from '../components/common';
import { createGraphProcessor, GraphProcessor } from './poc';
import { generateSetObservable, uuid } from '@brick/core';

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

  /**
   * 根据类型获取节点的默认数据
   * @param nodeType
   * @param defaultNodeData
   */
  _getDefaultNodeData = (nodeType: TNodeType, defaultNodeData?: Partial<IWorkflowNodeData>) => {
    const { metaData, defaultNodeConfigData } = this.nodeModule?.[nodeType] || {};
    return {
      id: uuid(),
      type: nodeType,
      name: metaData?.name,
      config: defaultNodeConfigData || {},
      ...defaultNodeData,
    } as IWorkflowNodeData;
  };

  addNodeData = (nodeType: TNodeType, defaultNodeData?: Partial<IWorkflowNodeData>) => {
    const currNodeData = this._getDefaultNodeData(nodeType, defaultNodeData);
    this.setWorkflowDataObservable((draft) => {
      draft.nodeMap.set({ ...draft.nodeMap.get(), [currNodeData.id]: currNodeData });
    });
    return currNodeData;
  };

  /**
   * 修改node data
   * @param nodeData
   */
  updateNodeData = (nodeData: IWorkflowNodeData) => {
    this.setWorkflowDataObservable((draft) => {
      const oldNode = draft.nodeMap?.[nodeData.id];
      oldNode.assign(nodeData);
      // 不需要深度合并
      // mergeIntoObservable(oldNode, nodeData);
    });
  };

  get setWorkflowDataObservable() {
    return generateSetObservable(this.workflowData!);
  }

  setActiveNodeById = (nodeId: string, type?: TNodeType) => {
    let nodeData = this.workflowData.nodeMap?.[nodeId].get();
    if (!nodeData && type) {
      nodeData = this.addNodeData(type, { id: nodeId });
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
