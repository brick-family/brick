import React, { FC } from 'react';
import { ProFormSelect } from '@ant-design/pro-components';
import { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select';
import { useTableOptionsData } from './hooks';

export interface IBizTableProFormSelectProps extends ProFormSelectProps {}

export const BizTableProFormSelect: FC<IBizTableProFormSelectProps> = (props) => {
  const { queryOptions } = useTableOptionsData();
  return (
    <ProFormSelect
      label="表格"
      placeholder="请选择表格"
      rules={[{ required: true, message: '请选择表格' }]}
      {...props}
      request={async () => queryOptions({})}
    />
  );
};
