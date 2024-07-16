import { FieldValueSet, useTableData } from '@brick/biz-component';
import { Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { FC } from 'react';

export interface ISettingFieldValueSetProps {
  formName?: NamePath;
}

export const SettingFieldValueSet: FC<ISettingFieldValueSetProps> = (props) => {
  const { formName = 'tableId' } = props;
  const tabelId = Form.useWatch(formName);
  const { table } = useTableData(tabelId);

  return <FieldValueSet tableConfig={table!} />;
};
