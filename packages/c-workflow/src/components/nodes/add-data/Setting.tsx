import React, { FC } from 'react';
import { ENAddDataType, ENodeType } from '@brick/types';
import {
  ISettingComponentProps,
  SettingFieldValueSet,
  SettingFormItem,
  SettingRadioGroup,
} from '../../common';
import { Divider } from 'antd';
import { AppTableCaseCadeSelect } from '@brick/biz-component';

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
const Setting: FC<ISettingComponentProps<ENodeType.AddData>> = (props) => {
  const { nodeData } = props;
  const tableNameKey = ['config', 'tableId'];
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
        <SettingRadioGroup options={AddDataTypeData} />
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
