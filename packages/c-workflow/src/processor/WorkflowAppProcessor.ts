import { observable, Observable } from '@legendapp/state';
import { ENodeType, IWorkflowEntity, IWorkflowNodeData, TNodeType } from '../types';
import { convertToLiteFlowScript, getDefaultNodeData, getNodeModule } from '../utils';
import { TNodeModuleMap } from '../components/common';
import { createGraphProcessor, GraphProcessor } from './poc';
import { generateSetObservable, uuid } from '@brick/core';
import { createResourceProcessor, ResourceProcessor } from '@brick/processor';

export class WorkflowAppProcessor {
  self: WorkflowAppProcessor;

  graphProcessor: GraphProcessor;

  private resourceProcessor: ResourceProcessor;

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

    this.resourceProcessor = createResourceProcessor().processor;
    this.graphProcessor = createGraphProcessor().processor;
    this.nodeModule = getNodeModule();

    // @ts-ignore
    window._workflow = this.workflowData;

    this.init();
  }

  private init = () => {
    // this.resourceProcessor.requestResourceAllByResourceType()
  };

  setWorkflowElement = (element: HTMLDivElement) => {
    this.workflowElement = element;
  };

  /**
   * 设置workflow数据
   * @param data
   */
  setWorkflowData = (data: IWorkflowEntity) => {
    data.layouts = [{ id: ENodeType.TableEvent, children: [] }];
    this.workflowData.set(data);
  };

  /**
   *
   * @returns
   */
  getLiteFlowElData = () => {
    const treeLevelData = this.graphProcessor?.getTreeLevelData();
    return convertToLiteFlowScript(treeLevelData, this.workflowData?.nodeMap?.get?.());
  };

  /**
   * 根据类型获取节点的默认数据
   * @param nodeType
   * @param defaultNodeData
   */
  _getDefaultNodeData = (nodeType: TNodeType, defaultNodeData?: Partial<IWorkflowNodeData>) => {
    return getDefaultNodeData(nodeType, { defaultNodeData, useNodeTypeId: false });
    // const { metaData, defaultNodeConfigData } = this.nodeModule?.[nodeType] || {};
    // return {
    //   id: uuid(),
    //   type: nodeType,
    //   name: metaData?.name,
    //   config: defaultNodeConfigData || {},
    //   ...defaultNodeData,
    // } as IWorkflowNodeData;
  };

  addNodeData = (addNodeDataParams: {
    // 当前节点id
    id: IWorkflowNodeData['id'];
    nodeType: TNodeType;
    defaultNodeData?: Partial<IWorkflowNodeData>;
  }) => {
    const { id, nodeType, defaultNodeData } = addNodeDataParams;

    const currNodeData = this._getDefaultNodeData(nodeType, defaultNodeData);
    this.setWorkflowDataObservable((draft) => {
      if (nodeType === ENodeType.Condition) {
        // 添加布局信息和节点信息
        const c1Id = uuid();
        const c2Id = uuid();

        const c1NodeData = this._getDefaultNodeData(ENodeType.AddData, defaultNodeData);
        const c2NodeData = this._getDefaultNodeData(ENodeType.AddData, defaultNodeData);

        draft.layouts.push({
          id: currNodeData.id,
          children: [{ id: c1Id }, { id: c2Id }],
        });

        draft.nodeMap.set({
          ...draft.nodeMap.get(),
          [currNodeData.id]: currNodeData,
          [c1Id]: c1NodeData,
          [c2Id]: c2NodeData,
        });
        return;
      }
      draft.layouts.push({ id: currNodeData.id, children: [] });
      draft.nodeMap.set({ ...draft.nodeMap.get(), [currNodeData.id]: currNodeData });
    });
    return currNodeData;
  };

  /**
   * 删除节点数据
   * @param id
   */
  removeNodeData = (id: IWorkflowNodeData['id']) => {
    this.setWorkflowDataObservable((draft) => {
      draft.nodeMap.set((value) => {
        delete value[id];
        return value;
      });
    });
  };

  /**
   * 复制node节点数据
   * @param id
   */
  copyNodeData = (id: IWorkflowNodeData['id'], newNodeId: string) => {
    const currNode = this.workflowData.nodeMap.get()?.[id];

    const newId = newNodeId || uuid();

    const newNode = { ...currNode, id: newId, name: `${currNode.name}-复制` };

    this.addNodeData(currNode.type, newNode);

    return newNode;
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

  /**
   * 根据nodeId修改节点数据
   * @param nodeId
   * @param nodeData
   */
  updateNodeDataById = (nodeId: string, nodeData: Partial<IWorkflowNodeData>) => {
    this.updateNodeData({ ...nodeData, id: nodeId } as IWorkflowNodeData);
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
