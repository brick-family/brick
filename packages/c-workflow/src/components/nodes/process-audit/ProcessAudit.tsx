import React, { FC, useMemo } from 'react';
import { INodeComponentProps } from '../../common';
import { ENodeType } from '@brick/types';

const ProcessAudit: FC<INodeComponentProps<ENodeType.ProcessAudit>> = (props) => {
  const { nodeData } = props;

  return <div>审批</div>;
};

export default ProcessAudit;
