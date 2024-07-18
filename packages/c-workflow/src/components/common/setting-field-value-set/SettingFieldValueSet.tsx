import { FieldValueSet, IFormItemProps, useTableData } from '@brick/biz-component';
import { Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { FC } from 'react';

export interface ISettingFieldValueSetProps extends IFormItemProps {
  tableNameKey?: NamePath;
}

export const SettingFieldValueSet: FC<ISettingFieldValueSetProps> = (props) => {
  const { tableNameKey = ['tableId'], ...otherProps } = props;

  const tableId = Form.useWatch(tableNameKey);

  const { table } = useTableData(tableId);

  return <FieldValueSet tableConfig={table!} {...otherProps} />;
};
