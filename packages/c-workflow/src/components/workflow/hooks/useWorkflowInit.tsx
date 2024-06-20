import { Graph } from '@antv/x6';
import { useUpdate } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useWorkflowAppSelector } from '../../../processor';
import { EdgeLabel } from '../../edge-label';
import { MiniMap } from '@antv/x6-plugin-minimap';
import { MinMapNode } from '../../toolbar/min-map/MinMapNode';

const SCALING_MIN_SIZE = 0.05;
const SCALING_MAX_SIZE = 12;

export const useWorkflowInit = (container: React.RefObject<HTMLDivElement>) => {
  const [setGraph, setWorkflowElement, addNode, minMapElement] = useWorkflowAppSelector((s) => [
    s.graphProcessor.setGraph,
    s.setWorkflowElement,
    s.graphProcessor.addNode,
    s.graphProcessor.minMapElement,
  ]);

  const currGraphRef = useRef<Graph>();
  const update = useUpdate();

  useEffect(() => {
    if (!container.current) {
      return;
    }

    if (currGraphRef.current) {
      return;
    }

    const graph = new Graph({
      container: container.current,
      autoResize: true, //自动变更画布大小
      grid: true,
      panning: true, //可以拖拽画布
      // mousewheel: true, //滚轮缩放画布
      background: {
        // color: 'red'
      },
      scaling: {
        min: SCALING_MIN_SIZE, // 默认值为 0.01
        max: SCALING_MAX_SIZE, // 默认值为 16
      },
      connecting: {},
      // @ts-ignore
      onEdgeLabelRendered: (args: any) => {
        console.log('q=>args', args);
        const { selectors, edge } = args;
        const content = selectors.foContent as HTMLDivElement;
        if (content) {
          ReactDOM.render(<EdgeLabel edge={edge} />, content);
        }
      },
    });

    // 设置使用scroller
    // graph.use(
    //   new Scroller({
    //     enabled: true,
    //     // pageVisible: false,
    //   }),
    // )

    setWorkflowElement(container.current);
    setGraph(graph);
    currGraphRef.current = graph;
    update();
  }, [container.current]);

  useEffect(() => {
    if (currGraphRef.current && minMapElement) {
      // 设置缩略图
      currGraphRef.current.use(
        new MiniMap({
          container: minMapElement!,
          width: 160,
          height: 120,
          padding: 10,
          scalable: false,
          // minScale: 1,
          // maxScale: 1,
          graphOptions: {
            createCellView(cell) {
              // 可以返回三种类型数据
              // 1. null: 不渲染
              // 2. undefined: 使用 X6 默认渲染方式
              // 3. CellView: 自定义渲染
              if (cell.isEdge()) {
                return null;
              }
              if (cell.isNode()) {
                return MinMapNode;
              }
            },
          },
        })
      );
    }
  }, [minMapElement, currGraphRef.current]);

  return {
    graph: currGraphRef.current,
  };
};
