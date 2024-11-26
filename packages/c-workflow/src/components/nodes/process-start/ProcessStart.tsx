import React, { FC, useMemo } from 'react';
import { INodeComponentProps } from '../../common';
import { ENodeType } from '@brick/types';

const ProcessStart: FC<INodeComponentProps<ENodeType.ProcessStart>> = (props) => {
  const { nodeData } = props;

  return <div>开始</div>;
};

export default ProcessStart;
