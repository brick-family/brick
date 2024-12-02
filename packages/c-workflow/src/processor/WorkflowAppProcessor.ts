import { observable, Observable } from '@legendapp/state';
import {
  ENodeType,
  IErrorNodeInfo,
  IWorkflowEntity,
  IWorkflowLayoutItem,
  IWorkflowNodeData,
  TNodeType,
} from '../types';
import {
  convertToLiteFlowScript,
  getDefaultNodeData,
  getLayoutsChildrenCount,
  getNodeModule,
  recursiveAddNode,
  recursiveRemoveNode,
} from '../utils';
import { TNodeModuleMap } from '../components/common';
import { generateSetObservable, uuid } from '@brick/core';
import { createResourceProcessor, ResourceProcessor } from '@brick/processor';
import { message } from 'antd';
import { createNodeProcessor, NodeProcessor } from './poc/NodeProcessor';

export class WorkflowAppProcessor {
  self: WorkflowAppProcessor;

  private resourceProcessor: ResourceProcessor;

  nodeProcessor: NodeProcessor;

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
    this.nodeProcessor = createNodeProcessor().processor;
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
    // const treeLevelData = this.graphProcessor?.getTreeLevelData();
    return convertToLiteFlowScript(treeLevelData, this.workflowData?.nodeMap?.get?.());
  };

  /**
   * 验证节点数据
   */
  validNodeData = async () => {
    // 定义递归函数
    const validateNodeRecursively = async (node: IWorkflowLayoutItem): Promise<boolean> => {
      // 获取节点数据
      const nodeId = node.id;
      const nodeData = this.workflowData.nodeMap?.[nodeId]?.get();

      // 验证当前节点
      const result = await this.nodeModule[nodeData.type]?.validation?.(nodeData);

      // 如果验证失败
      if (result && result.valid === false) {
        this.nodeProcessor.errorNodeData.set({
          id: node.id,
          info: result,
        });
        message.error(`${nodeData.name}节点【${result.message}】`);
        return false;
      }

      // 如果有子节点，则递归验证每个子节点
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          const isValid = await validateNodeRecursively(child);
          if (!isValid) {
            return false; // 子节点验证失败，停止递归
          }
        }
      }
      return true; // 当前节点及其子节点验证通过
    };

    // 遍历并验证 graph 中的每个顶级节点
    for (const node of this.workflowData.graph.get() || []) {
      const isValid = await validateNodeRecursively(node);
      if (!isValid) {
        return false; // 如果某个顶级节点验证失败，立即返回 false
      }
    }
    this.nodeProcessor.errorNodeData.set(null);
    return true; // 所有节点验证通过
  };

  /**
   * 根据类型获取节点的默认数据
   * @param nodeType
   * @param defaultNodeData
   */
  _getDefaultNodeData = (nodeType: TNodeType, defaultNodeData?: Partial<IWorkflowNodeData>) => {
    return getDefaultNodeData(nodeType, { defaultNodeData, useNodeTypeId: false });
  };

  addNodeData = (addNodeDataParams: {
    sourceNodeId: IWorkflowNodeData['id'];
    nodeType: TNodeType;
    defaultNodeData?: Partial<IWorkflowNodeData>;
    // 是否是分支节点插入
    isBrandNode?: boolean;
  }) => {
    const { sourceNodeId, nodeType, defaultNodeData, isBrandNode = false } = addNodeDataParams;

    const sourceNodeData = this.workflowData.nodeMap?.[sourceNodeId]?.get();

    // node节点
    const currNodeData = this._getDefaultNodeData(nodeType, defaultNodeData);
    // 如果分支节点，修复数量
    if (isBrandNode) {
      const count = getLayoutsChildrenCount(this.workflowData.graph.get(), sourceNodeId);
      currNodeData.name = `${currNodeData.name}${count + 1}`;
    }

    this.setWorkflowDataObservable((draft) => {
      let layoutItem: IWorkflowLayoutItem = {
        id: currNodeData.id,
        children: [],
      };

      let nodeDataMap = {
        [currNodeData.id]: currNodeData,
      };

      // 不是分支节点，并且是条件节点
      if (!isBrandNode && nodeType === ENodeType.Condition) {
        // 添加布局信息和节点信息
        const c1Id = uuid();
        const c2Id = uuid();

        const c1NodeData = this._getDefaultNodeData(ENodeType.ConditionItem, {
          ...defaultNodeData,
          name: '条件1',
        });
        const c2NodeData = this._getDefaultNodeData(ENodeType.ConditionItem, {
          ...defaultNodeData,
          name: '条件2',
        });
        console.log('q=>node-111-2222', c1NodeData, c2NodeData);

        // 添加布局信息
        layoutItem.children = [
          { id: c1Id, children: [] },
          { id: c2Id, children: [] },
        ];

        // 添加节点信息
        nodeDataMap[c1Id] = c1NodeData;
        nodeDataMap[c2Id] = c2NodeData;
      }

      // 子集节点插入 (条件节点点击添加，或者是分支节点)
      const isChildrenInsert = sourceNodeData.type === ENodeType.ConditionItem || isBrandNode;

      // 如果是分支节点，在节点后插入
      const childrenInsertDirect = isBrandNode ? 'after' : 'before';
      // 添加布局信息
      recursiveAddNode({
        sourceNodeId,
        layouts: draft.graph,
        newLayoutItem: layoutItem,
        isChildrenInsert,
        childrenInsertDirect,
      });

      draft.nodeMap.set({ ...draft.nodeMap.get(), ...nodeDataMap });
    });

    return currNodeData;
  };

  /**
   * 添加分支节点数据
   * @param addBranchNodeDataParams
   */
  addBranchNodeData = (addBranchNodeDataParams: { sourceNodeId: IWorkflowNodeData['id'] }) => {
    const { sourceNodeId } = addBranchNodeDataParams;
    this.addNodeData({
      sourceNodeId,
      nodeType: ENodeType.ConditionItem,
      isBrandNode: true,
    });
  };

  /**
   * 获取node数据
   * @param id
   * @returns
   */
  getNodeDataById = (id: string) => {
    return this.workflowData.nodeMap?.[id]?.get();
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
