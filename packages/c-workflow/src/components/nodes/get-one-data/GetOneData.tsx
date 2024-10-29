import { ENodeType } from '@brick/types';
import React, { FC, useMemo } from 'react';
import { INodeComponentProps } from '../../common';
import { NodePlaceholder } from '../../common/node-placeholder';

export const GetOneData: FC<INodeComponentProps<ENodeType.GetOneData>> = (props) => {
  const { nodeData } = props;
  const { config } = nodeData;
  const text = useMemo(() => {
    if (config?.tableId) {
      return config?.tableId;
    }
    return <NodePlaceholder>请设置想要获取的数据</NodePlaceholder>;
  }, [config?.tableId]);
  return <div>{text}</div>;
};

export default GetOneData;
