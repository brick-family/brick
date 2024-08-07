import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { Toolbar } from '../toolbar';
import { useSetWorkflowData } from './hooks/useSetWorkflowData';
import { useWorkflowInit } from './hooks/useWorkflowInit';
import s from './workflow.less';
import { SettingContainer } from './container';
import { IWorkflowEntity } from '@brick/types';
import './workflowUtils';

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
