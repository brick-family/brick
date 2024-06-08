import React, { FC } from 'react';
import { ENodeType } from '@brick/types';
import { ISettingComponentProps, SettingFormItem } from '../../common';
import { Divider } from 'antd';
import { AppTableCaseCadeSelect } from '@brick/biz-component';

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
    </div>
  );
};

export default Setting;
