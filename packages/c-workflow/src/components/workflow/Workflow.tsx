import { register } from '@antv/x6-react-shape';
import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { SHAPE_NODE } from '../../constants/Workflow';
import { TWorkflowData } from '../../types';
import { NodeComponent } from '../nodes';
import { SettingContainer } from '../settings';
import { Toolbar } from '../toolbar';
import { useSetWorkflowData } from './hooks/useSetWorkflowData';
import { useWorkflowInit } from './hooks/useWorkflowInit';
import s from './workflow.less';

// 注册自定义节点
register({
  shape: SHAPE_NODE,
  width: 100,
  height: 40,
  effect: ['data'], //属性变化重新渲染组件
  component: NodeComponent,
});
export interface IWorkflowProps {
  style?: React.CSSProperties;
  className?: string;
  data?: TWorkflowData;
}

const data1 = {
  nodes: [
    {
      id: 'node1',
      shape: SHAPE_NODE,
      x: 40,
      y: 40,
      label: 'hello',
      data: {
        id: 'node1',
        table: '1',
      },
    },
    {
      id: 'node2',
      shape: SHAPE_NODE,
      x: 160,
      y: 180,
      label: 'world',
      data: {
        id: 'node2',
        table: '2',
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
};

export const Workflow: FC<IWorkflowProps> = ({ style, className, data }) => {
  const classNameStr = classNames(s.workflow, className);

  const containerRef = useRef<HTMLDivElement>(null);

  const { graph } = useWorkflowInit(containerRef);

  useSetWorkflowData({
    data: data!,
    graph: graph!,
  });

  return (
    <div style={style} className={classNameStr}>
      <div>
        {graph && (
          <React.Fragment>
            <Toolbar />
          </React.Fragment>
        )}
      </div>
      <div ref={containerRef} className={s.container} id="container"></div>
      <SettingContainer />
    </div>
  );
};
