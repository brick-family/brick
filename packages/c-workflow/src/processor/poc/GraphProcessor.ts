import { BaseProcessor, uuid } from '@brick/core';
import { Edge, Graph, Markup, Node } from '@antv/x6';
import { TNodeType } from '@brick/types';
import { DEFAULT_NODE_ATTR, NODE_GAP, NODE_HEIGHT, NODE_WIDTH } from '../../constants';
import { convertToLevelTree } from '../../utils';

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

    const connections =
      edges?.map((f) => ({
        sourceId: f.getSourceCellId(),
        targetId: f.getTargetCellId(),
      })) || [];

    // 1. 通过edges找出层级关系
    const treeLevelData = convertToLevelTree(connections);

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
    this.graph?.removeNode(node);
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
