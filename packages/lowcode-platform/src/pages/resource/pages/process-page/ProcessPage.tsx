import { WorkflowApp } from '@brick/workflow';
import React, { FC } from 'react';

export interface IProgressPageProps {}

export const ProgressPage: FC<IProgressPageProps> = (props) => {
  return (
    <div>
      <WorkflowApp />
    </div>
  );
};

export default ProgressPage;
