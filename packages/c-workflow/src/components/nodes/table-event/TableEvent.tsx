import React, { FC, useMemo } from 'react';
import { INodeComponentProps } from '../../common';
import { ENodeType } from '@brick/types';
import { TableTriggerEventGroupData } from './Setting';
import { NodePlaceholder } from '../../common/node-placeholder';

const TableEvent: FC<INodeComponentProps<ENodeType.TableEvent>> = (props) => {
  const { nodeData } = props;

  const triggerEvent = nodeData?.config?.triggerEvent;

  const text = useMemo(() => {
    if (triggerEvent) {
      return triggerEvent
        ?.map((item) => TableTriggerEventGroupData.find((f) => f.value === item))
        ?.map((item) => item?.label)
        ?.join(',');
    }
    return <NodePlaceholder>请设置触发事件</NodePlaceholder>;
  }, [triggerEvent]);

  return <div>{text}</div>;
};

export default TableEvent;
