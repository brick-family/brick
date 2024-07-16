import React, { FC } from 'react';
import { ENAddDataType, ENodeType } from '@brick/types';
import { ISettingComponentProps, SettingFormItem, SettingRadioGroup } from '../../common';
import { Divider } from 'antd';
import { AppTableCaseCadeSelect, FieldValueSet } from '@brick/biz-component';

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
  return (
    <div>
      <SettingFormItem
        title={'选择表单'}
        formItemProps={{
          name: ['tableId'],
        }}
      >
        <AppTableCaseCadeSelect />
      </SettingFormItem>
      <Divider />

      <SettingFormItem
        title={'新增数据'}
        formItemProps={{
          name: ['data'],
        }}
      >
        <SettingRadioGroup options={AddDataTypeData} />
      </SettingFormItem>

      <SettingFormItem
        title={'字段设置'}
        formItemProps={{
          name: ['data'],
        }}
      >
        <FieldValueSet tableConfig={{}} />
      </SettingFormItem>
    </div>
  );
};

export default Setting;
