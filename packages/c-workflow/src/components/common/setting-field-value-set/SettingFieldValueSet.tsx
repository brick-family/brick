import { FieldValueSet, useTableData } from '@brick/biz-component';
import { Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { FC } from 'react';

export interface ISettingFieldValueSetProps {
  tableNameKey?: NamePath;
}

export const SettingFieldValueSet: FC<ISettingFieldValueSetProps> = (props) => {
  const { tableNameKey = ['tableId'] } = props;
  const tableId = Form.useWatch(tableNameKey);

  const { table } = useTableData(tableId);

  return <FieldValueSet tableConfig={table!} />;
};
