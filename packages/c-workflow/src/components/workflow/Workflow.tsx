import { register } from '@antv/x6-react-shape';
import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { SHAPE_NODE } from '../../constants/Workflow';
import { Toolbar } from '../toolbar';
import { useSetWorkflowData } from './hooks/useSetWorkflowData';
import { useWorkflowInit } from './hooks/useWorkflowInit';
import s from './workflow.less';
import { NodeContainer, SettingContainer } from './container';
import { IWorkflowEntity } from '@brick/types';

// 注册自定义节点
register({
  shape: SHAPE_NODE,
  width: 100,
  height: 40,
  effect: ['data'], //属性变化重新渲染组件
  component: NodeContainer,
});

export interface IWorkflowProps {
  style?: React.CSSProperties;
  className?: string;
  data?: IWorkflowEntity;
}

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
