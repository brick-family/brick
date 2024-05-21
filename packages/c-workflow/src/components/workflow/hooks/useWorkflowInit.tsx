import { Graph } from '@antv/x6';
import { useUpdate } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useWorkflowSelector } from '../../../processor';
import { EdgeLabel } from '../../edge-label';

export const useWorkflowInit = (container: React.RefObject<HTMLDivElement>) => {
  const [setGraph, setWorkflowElement, addNode] = useWorkflowSelector((s) => [
    s.setGraph,
    s.setWorkflowElement,
    s.addNode,
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
      panning: false, //可以拖拽画布
      // mousewheel: true, //滚轮缩放画布
      background: {
        // color: 'red'
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
    //     pageVisible: false,
    //   }),
    // )

    setWorkflowElement(container.current);
    setGraph(graph);
    currGraphRef.current = graph;
    update();
  }, [container.current]);

  return {
    graph: currGraphRef.current,
  };
};
