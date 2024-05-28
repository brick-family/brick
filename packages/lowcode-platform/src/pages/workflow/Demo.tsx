import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ENodeType,
  NODE_GAP,
  NODE_HEIGHT,
  NODE_WIDTH,
  WorkflowApp,
  WorkflowAppProcessor,
} from '@brick/workflow';
import { useMemoizedFn } from 'ahooks';
import { Button } from 'antd';
import { uuid } from '@brick/utils';

export interface IWorkflowProps {}

const data1 = {
  id: 1,
  type: 'Table',
  graphData: {
    cells: [],
  },
  // "cells": [
  //   // {
  //   //   "position": {
  //   //     "x": -590,
  //   //     "y": 0
  //   //   },
  //   //   "size": {
  //   //     "width": 100,
  //   //     "height": 40
  //   //   },
  //   //   "view": "react-shape-view",
  //   //   "shape": "SHAPE_NODE",
  //   //   "id": "node1",
  //   //   "label": "hello",
  //   //   "data": {
  //   //     "id": "node1",
  //   //     "table": "1"
  //   //   },
  //   //   "zIndex": 1
  //   // },
  //   // {
  //   //   "position": {
  //   //     "x": 160,
  //   //     "y": 180
  //   //   },
  //   //   "size": {
  //   //     "width": 100,
  //   //     "height": 40
  //   //   },
  //   //   "view": "react-shape-view",
  //   //   "shape": "SHAPE_NODE",
  //   //   "id": "node2",
  //   //   "label": "world",
  //   //   "data": {
  //   //     "id": "node2",
  //   //     "table": "2"
  //   //   },
  //   //   "zIndex": 1
  //   // },
  //   // {
  //   //   "shape": "edge",
  //   //   "attrs": {
  //   //     "line": {
  //   //       "stroke": "#8f8f8f",
  //   //       "strokeWidth": 1
  //   //     }
  //   //   },
  //   //   "id": "5c568307-99d4-4f7f-82cd-170395800f21",
  //   //   "labels": [
  //   //     {
  //   //       "attrs": {
  //   //         "label": {
  //   //           "text": "x6"
  //   //         }
  //   //       }
  //   //     }
  //   //   ],
  //   //   "zIndex": 1,
  //   //   "source": {
  //   //     "cell": "node1"
  //   //   },
  //   //   "target": {
  //   //     "cell": "node2"
  //   //   }
  //   // }
  // ]
};

const WorkflowDemo: FC<IWorkflowProps> = (props) => {
  const [value, setValue] = useState(data1);
  const ref = useRef<WorkflowAppProcessor>();

  const onSave = () => {
    const data = ref.current?.getData();
  };
  const onChange = useMemoizedFn((value) => {
    console.log('q=>value', value);

    // setValue(value);
  });

  useEffect(() => {
    setTimeout(() => {
      setValue(data1);
      onAdd();
    }, 100);
  }, []);

  const onAdd1 = (edge: any) => {
    const sourceId = uuid();
    ref.current?.addNodeByEdge({
      nodeType: ENodeType.GetMoreData,
      data: {
        data: {},
      },
      edge,
    });
  };

  const onAdd = () => {
    const sourceId = uuid();
    const endId = uuid();
    ref.current?.addNode(ENodeType.TableEvent, {
      view: 'react-shape-view',
      shape: 'SHAPE_NODE',
      id: sourceId,
      label: 'hello',
      x: 0,
      y: 0,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      data: {
        id: 'node1',
        table: '1',
      },
    });

    ref.current?.addNode(ENodeType.End, {
      view: 'react-shape-view',
      shape: 'SHAPE_NODE',
      id: endId,
      label: 'hello',
      x: 0,
      y: NODE_GAP + NODE_HEIGHT,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      data: {},
    });

    const edge = ref.current?.addEdge(sourceId, endId);
    onAdd1(edge);
    reset();
  };

  const reset = () => {
    ref.current?.redraw();
  };

  return (
    <div style={{ height: 500 }}>
      <Button onClick={onSave}>保存</Button>
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={reset}>reset</Button>
      {/* @ts-ignore */}
      <WorkflowApp ref={ref} data={value} />
    </div>
  );
};

export default WorkflowDemo;
