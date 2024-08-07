import React, { FC } from 'react';
import { ENodeType, IWorkflowNodeData } from '@brick/types';

export const DeleteData: FC<IWorkflowNodeData<ENodeType.DeleteData>> = (props) => {
  const { config } = props;

  return <div></div>;
};

export default DeleteData;
