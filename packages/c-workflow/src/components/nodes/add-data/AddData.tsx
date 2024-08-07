import React, { FC } from 'react';
import { ENodeType } from '@brick/types';
import { useResourceDataCache } from '@brick/processor';
import { INodeComponentProps } from '../../common';

const AddData: FC<INodeComponentProps<ENodeType.AddData>> = (props) => {
  const { nodeData } = props;
  const { config } = nodeData;
  const { data } = useResourceDataCache(config?.tableId!);

  return <div>{data?.title}</div>;
};

export default AddData;
