import React, { FC, useEffect, useState } from 'react';
import { ENAddDataType, ENodeType, IColumnEntity, ITableEntity } from '@brick/types';
import {
  ISettingComponentProps,
  SettingFieldValueSet,
  SettingFormItem,
  SettingRadioGroup,
} from '../../common';
import { Divider, Form } from 'antd';
import { AppTableCaseCadeSelect } from '@brick/biz-component';
import { QueryBuilder } from '@brick/component';
import { useCreation } from 'ahooks';
import { getTable } from '@brick/services';

export const AddDataTypeData = [
  {
    label: '新建单条数据',
    value: ENAddDataType.single,
  },
  {
    label: '新建多条数据',
    value: ENAddDataType.multiple,
  },
];

// TODO app table select多个form更新
const Setting: FC<ISettingComponentProps<ENodeType.AddOneData>> = (props) => {
  const { nodeData } = props;
  const tableNameKey = ['config', 'tableId'];
  const [tableConfig, setTableConfig] = useState({} as ITableEntity);

  const tableId = Form.useWatch(tableNameKey) as string;

  useEffect(() => {
    if (tableId) {
      getTable({ id: tableId }).then((res) => {
        console.log('res222', res, 'tableID', tableId);
        setTableConfig(res!);
      });
    }
  }, [tableId]);

  return (
    <div>
      <SettingFormItem title={'选择表单'}>
        <AppTableCaseCadeSelect appNameKey={['config', 'appId']} tableNameKey={tableNameKey} />
      </SettingFormItem>
      <Divider />

      <SettingFormItem
        title={'新增数据'}
        formItemProps={{
          name: ['config', 'type'],
        }}
      >
        {tableConfig?.columns?.length ? (
          <QueryBuilder tableConfig={tableConfig} hideFilter />
        ) : null}
      </SettingFormItem>
      <Divider />
      <SettingFormItem
        title={'字段设置'}
        formItemProps={{
          name: ['config', 'defaultValues'],
        }}
      >
        <SettingFieldValueSet tableNameKey={tableNameKey} />
      </SettingFormItem>
    </div>
  );
};

export default Setting;
