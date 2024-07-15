import { BaseProcessor, uuid } from '@brick/core';
import { Edge, Graph, Markup, Node } from '@antv/x6';
import { TNodeType } from '@brick/types';
import { DEFAULT_NODE_ATTR, NODE_GAP, NODE_HEIGHT, NODE_WIDTH } from '../../constants';
import { convertToLevelTree, convertToLiteFlowScript } from '../../utils';

/**
 * 连接线的配置
 */
const EdgeConfig: Edge.Metadata = {
  attrs: {
    line: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
    },
  },
  defaultLabel: {
    markup: Markup.getForeignObjectMarkup(),
    attrs: {
      fo: {
        width: 18,
        height: 18,
        x: -9,
        y: 0,
        // y: -(NODE_GAP / 2),
      },
    },
  },
  label: {
    // attrs: {
    //   text: {
    //     text: "s1"
    //   }
    // },
    position: {
      distance: -35,
      // distance: -(NODE_GAP / 2)
    },
  },
  router: {
    name: 'orth',
    args: {
      padding: {
        bottom: 10, // 不请楚什么意思
      },
    },
  },
};

export class GraphProcessor extends BaseProcessor {
  // graph实例，不是
  graph: Graph | null;
  minMapElement: HTMLDivElement | null;

  constructor() {
    super();
    this.graph = null;
    this.minMapElement = null;
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 设置graph实例
   * @param graph
   */
  setGraph = (graph: Graph) => {
    this.graph = graph;
    // @ts-ignore
    window._graph = graph;
  };

  /**
   * 设置小地图实例
   * @param instance
   */
  setMinMapElement = (instance: HTMLDivElement) => {
    this.minMapElement = instance;
  };

  /**
   * 添加node节点
   * @param nodeType
   * @param data
   */
  addNode = (nodeType: TNodeType, data: Node.Metadata) => {
    data.data = {
      ...data.data,
      type: nodeType,
    };
    if (!data.id) {
      data.id = uuid();
    }
    return this.graph?.addNode({ ...DEFAULT_NODE_ATTR, ...data });
  };

  addEdge = (source: string, target: string) => {
    return this.graph?.addEdge({
      source,
      target,
      ...EdgeConfig,
    });
  };

  addNodeByEdge = ({
    nodeType,
    data,
    edge,
    isRedraw = true,
  }: {
    nodeType: TNodeType;
    data?: Node.Metadata;
    edge: Edge;
    isRedraw?: boolean;
  }) => {
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();

    this.addNode(nodeType, data!);
    // 当前线删除
    edge.remove();

    this.addEdge(sourceId, data!.id!);
    this.addEdge(data!.id!, targetId);

    if (isRedraw) {
      this.redraw();
    }
  };

  getConnections = () => {
    const edges = this.graph?.getEdges();
    const connections =
      edges?.map((f) => ({
        sourceId: f.getSourceCellId(),
        targetId: f.getTargetCellId(),
      })) || [];
    return connections;
  };

  /**
   * 后去Tree Level数据
   * @returns
   */
  getTreeLevelData = () => {
    const connections = this.getConnections();

    // 1. 通过edges找出层级关系
    const treeLevelData = convertToLevelTree(connections);

    return treeLevelData;
  };

  /**
   * 重新绘制实图
   */
  redraw = () => {
    const nodes = this.graph?.getNodes();
    const edges = this.graph?.getEdges();

    const graphArea = this.graph?.getGraphArea();
    // 画布宽度
    const graphWidth = graphArea?.width || 0;
    // 画布高度
    const graphHeight = graphArea?.height || 0;

    // 1. 通过edges找出层级关系
    const treeLevelData = this.getTreeLevelData();

    treeLevelData.forEach((currLevelData, level) => {
      // 当前级别数量
      const currLevenLength = currLevelData.length;
      // 当前级别node总宽度
      const nodeSumWidth = NODE_WIDTH * currLevenLength + NODE_GAP * (currLevenLength - 1);

      const currBeginX = (graphWidth - nodeSumWidth) / 2;

      currLevelData.forEach((nodeId, index) => {
        const currNode = this.graph?.getCellById(nodeId) as Node;

        if (currNode) {
          // const { width, height } = currNode.getSize();;

          currNode?.setPosition({
            x: currBeginX + (NODE_WIDTH + NODE_GAP) * index,
            y: NODE_GAP + (NODE_HEIGHT + NODE_GAP) * level,
          });
        }
      });
    });

    // 2. 根据层级关系重新渲染
  };

  /**
   * 删除node节点
   * @param node
   */
  removeNode = (node: Node) => {
    // 获取与删除节点相连的边
    const incomingEdges = this.graph?.getIncomingEdges(node);
    const outgoingEdges = this.graph?.getOutgoingEdges(node);

    // 删除相关边
    if (incomingEdges) {
      incomingEdges.forEach((edge) => edge.remove());
    }
    if (outgoingEdges) {
      outgoingEdges.forEach((edge) => edge.remove());
    }

    // 重新连接相邻节点
    if (incomingEdges && outgoingEdges) {
      incomingEdges.forEach((inEdge) => {
        outgoingEdges.forEach((outEdge) => {
          // 创建新的边
          this.addEdge(inEdge.getSourceCellId(), outEdge.getTargetCellId());
        });
      });
    }
    this.graph?.removeNode(node);
    this.redraw();
  };

  /**
   * 复制节点
   * @param node 当前node
   * @param nodeId 新节点id
   */
  copyNode = (node: Node) => {
    const graph = this.graph;

    // 复制节点
    const newNode = node.clone();
    this?.graph?.addCell(newNode);

    // 获取新节点id
    const newNodeId = newNode.id;

    // console.log('q=>targetId-new-node', newNode, newNodeId);

    // 获取节点B的入边和出边
    const incomingEdges = graph?.getIncomingEdges(node);
    const outgoingEdges = graph?.getOutgoingEdges(node); // 下面那条线

    // 移动当前节点下的所有连线
    if (outgoingEdges) {
      graph?.removeCells(outgoingEdges);
    }

    // 当前节点和新节点连接
    this.addEdge(node.id, newNodeId);

    // 获取当前节点之前连接的下个节点
    const targetId = outgoingEdges?.[0]?.getTargetCellId?.();
    if (targetId) {
      // 新节点和目标节点连接
      this.addEdge(newNodeId, targetId);
    }

    console.log('q=>targetId', targetId);

    // console.log('q=>clone-new', newNode, newNodeId, targetId, incomingEdges, outgoingEdges );
    // // 更新入边，使其连接到新节点D
    // if (incomingEdges) {
    //   incomingEdges.forEach((edge) => {
    //     const sourceId = edge.getSourceCellId();
    //     console.log('q=>adding incoming edge', sourceId, newNodeId);
    //     this.addEdge(sourceId, newNodeId);

    //     // 移除旧的入边
    //     graph?.removeCells([edge]);
    //   });
    // }

    // // 更新出边，使其从新节点D连接到目标节点
    // if (outgoingEdges) {
    //   outgoingEdges.forEach((edge) => {
    //     const targetId = edge.getTargetCellId();
    //     console.log('q=>adding outgoing edge', newNodeId, targetId);
    //     this.addEdge(newNodeId, targetId);
    //   });
    // }

    // // 更新节点B的出边，使其连接到新节点D
    // if (outgoingEdges) {
    //   outgoingEdges.forEach((edge) => {
    //     const targetId = edge.getTargetCellId();
    //     console.log('q=>adding edge from original node', node.id, newNodeId);
    //     this.addEdge(node.id, newNodeId);

    //     // 移除旧的出边
    //     graph?.removeCells([edge]);
    //   });
    // }

    this.redraw();

    return newNodeId;
  };

  /**
   * 获取workflow数据
   */
  getData = () => {
    return this.graph?.toJSON();
  };

  /**
   * 设置画布局中
   */
  setGraphCenter = () => {
    this.graph?.center();
  };

  /**
   * 设置画布内容居中
   */
  setGraphContentCenter = () => {
    this.graph?.centerContent();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createGraphProcessor = () => {
  let processor: null | GraphProcessor = new GraphProcessor();

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
