import { observable, Observable } from '@legendapp/state';
import {
  ENodeType,
  IWorkflowEntity,
  IWorkflowLayoutItem,
  IWorkflowNodeData,
  TNodeType,
} from '../types';
import {
  convertToLiteFlowScript,
  getDefaultNodeData,
  getNodeModule,
  recursiveAddNode,
  recursiveRemoveNode,
} from '../utils';
import { TNodeModuleMap } from '../components/common';
import { generateSetObservable, uuid } from '@brick/core';
import { createResourceProcessor, ResourceProcessor } from '@brick/processor';
import { message } from 'antd';

export class WorkflowAppProcessor {
  self: WorkflowAppProcessor;

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
    // this.graphProcessor = createGraphProcessor().processor;
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
    this.workflowData.set(data);
  };

  /**
   *
   * @returns
   */
  getLiteFlowElData = () => {
    return '';
    // const treeLevelData = this.graphProcessor?.getTreeLevelData();
    // return convertToLiteFlowScript(treeLevelData, this.workflowData?.nodeMap?.get?.());
  };

  /**
   * 验证节点数据
   */
  validNodeData = async () => {
    this.workflowData.graph?.forEach(async (node) => {
      const nodeId = node.id.get();
      const nodeData = this.workflowData.nodeMap?.[nodeId]?.get();
      const result = await this.nodeModule[nodeData.type]?.validation?.(nodeData);

      // 验证失败
      if (result && result.valid === false) {
        message.error(`${nodeData.name}节点【${result.message}】`);
        return false;
      }
    });

    return true;
  };

  /**
   * 根据类型获取节点的默认数据
   * @param nodeType
   * @param defaultNodeData
   */
  _getDefaultNodeData = (nodeType: TNodeType, defaultNodeData?: Partial<IWorkflowNodeData>) => {
    return getDefaultNodeData(nodeType, { defaultNodeData, useNodeTypeId: false });
  };

  _addConditionNodeData = () => {};

  addNodeData = (addNodeDataParams: {
    sourceNodeId: IWorkflowNodeData['id'];
    nodeType: TNodeType;
    defaultNodeData?: Partial<IWorkflowNodeData>;
  }) => {
    const { sourceNodeId, nodeType, defaultNodeData } = addNodeDataParams;

    const sourceNodeData = this.workflowData.nodeMap?.[sourceNodeId]?.get();
    // 拆分node节点
    const currNodeData = this._getDefaultNodeData(nodeType, defaultNodeData);

    this.setWorkflowDataObservable((draft) => {
      let layoutItem: IWorkflowLayoutItem = {
        id: currNodeData.id,
        children: [],
      };

      let nodeDataMap = {
        [currNodeData.id]: currNodeData,
      };

      if (nodeType === ENodeType.Condition) {
        // 添加布局信息和节点信息
        const c1Id = uuid();
        const c2Id = uuid();

        const c1NodeData = this._getDefaultNodeData(ENodeType.ConditionItem, defaultNodeData);
        const c2NodeData = this._getDefaultNodeData(ENodeType.ConditionItem, defaultNodeData);

        // 添加布局信息
        layoutItem.children = [
          { id: c1Id, children: [] },
          { id: c2Id, children: [] },
        ];

        // 添加节点信息
        nodeDataMap[c1Id] = c1NodeData;
        nodeDataMap[c2Id] = c2NodeData;
      }

      console.log('q=>1111', sourceNodeData.type === ENodeType.ConditionItem, sourceNodeData);

      // 添加布局信息
      recursiveAddNode({
        sourceNodeId,
        layouts: draft.graph,
        newLayoutItem: layoutItem,
        isChildrenInsert: sourceNodeData.type === ENodeType.ConditionItem,
      });

      draft.nodeMap.set({ ...draft.nodeMap.get(), ...nodeDataMap });
    });
    return currNodeData;
  };

  /**
   * 删除节点数据
   * @param id
   */
  removeNodeData = (id: IWorkflowNodeData['id']) => {
    this.setWorkflowDataObservable((draft) => {
      const nodeType = draft.nodeMap[id].get().type;

      console.log('q=>removeIds-删除前', JSON.stringify(draft.graph.get()));
      // 删除布局信息
      const removeIds = recursiveRemoveNode({
        sourceNodeId: id,
        layouts: draft.graph,
        deleteIfSingle: nodeType === ENodeType.ConditionItem,
      });

      console.log('q=>removeIds-删除后', removeIds);
      // 删除节点信息
      if (removeIds?.length) {
        draft.nodeMap.set((value) => {
          removeIds?.forEach((removeId) => {
            delete value[removeId];
          });
          return value;
        });
      }
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

    this.addNodeData({
      sourceNodeId: id,
      nodeType: currNode.type,
      defaultNodeData: newNode,
    });
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
      // TODO
      // nodeData = this.addNodeData(type, { id: nodeId });
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
