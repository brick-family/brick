import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { Toolbar } from '../toolbar';
import { useSetWorkflowData } from './hooks/useSetWorkflowData';
import s from './workflow.less';
import { SettingContainer, WorkflowContainer } from './container';
import { IWorkflowEntity } from '@brick/types';
import './workflowUtils';

export interface IWorkflowProps {
  style?: React.CSSProperties;
  className?: string;
  data?: IWorkflowEntity;
}

export const Workflow: FC<IWorkflowProps> = ({ style, className, data }) => {
  const classNameStr = classNames(s.workflow, className);
  useSetWorkflowData({
    data: data!,
  });

  return (
    <div style={style} className={classNameStr}>
      <Toolbar />

      <WorkflowContainer />
      <SettingContainer />
    </div>
  );
};
