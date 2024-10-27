import React, { FC, useMemo } from 'react';
import { ENodeType } from '@brick/types';
import { useResourceDataCache } from '@brick/processor';
import { INodeComponentProps } from '../../common';
import { NodePlaceholder } from '../../common/node-placeholder';

const AddData: FC<INodeComponentProps<ENodeType.AddData>> = (props) => {
  const { nodeData } = props;
  const { config } = nodeData;
  const { data } = useResourceDataCache(config?.tableId!);

  const text = useMemo(() => {
    if (data?.title) {
      return data.title;
    }
    return <NodePlaceholder>请设置新增数据</NodePlaceholder>;
  }, [data?.title]);
  return <div>{text}</div>;
};

export default AddData;
