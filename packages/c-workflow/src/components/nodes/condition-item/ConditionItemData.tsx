import React, { FC } from 'react';
import { ENodeType, IWorkflowNodeData } from '@brick/types';

export const ConditionItemData: FC<IWorkflowNodeData<ENodeType.ConditionItem>> = (props) => {
  const { config } = props;

  return <div>ConditionItem</div>;
};

export default ConditionItemData;
