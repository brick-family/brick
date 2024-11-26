import { useParams } from '@umijs/max';
import React, { FC } from 'react';

export interface IProcessOperationProps {}

export const ProcessOperation: FC<IProcessOperationProps> = (props) => {
  const { resourceId, aId } = useParams();

  return <div></div>;
};
