import React, { FC, useRef } from 'react';
import { Button, Checkbox, message, Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useItemDetailSelector } from '../..';
import { SubmitTable } from './SubmitTable';
import { SubmitProcess } from './SubmitProcess';

export interface ISubmitProps {}

export const Submit: FC<ISubmitProps> = (props) => {
  const [tableData] = useItemDetailSelector((s) => [s.table?.data]);

  if (tableData?.isProcess) {
    return <SubmitProcess />;
  }

  return <SubmitTable />;
};
