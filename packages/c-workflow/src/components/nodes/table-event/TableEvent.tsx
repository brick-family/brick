import React, { FC, useMemo } from 'react';
import { INodeComponentProps } from '../../common';
import { ENodeType } from '@brick/types';
import { TableTriggerEventGroupData } from './Setting';

const TableEvent: FC<INodeComponentProps<ENodeType.TableEvent>> = (props) => {
  const { nodeData } = props;

  const triggerEvent = nodeData?.config?.triggerEvent;

  const text = useMemo(() => {
    if (triggerEvent) {
      triggerEvent?.map((item) => TableTriggerEventGroupData.find((f) => f.value === item));
    }
    return '';
  }, [triggerEvent]);

  return <div>{text}</div>;
};

export default TableEvent;
