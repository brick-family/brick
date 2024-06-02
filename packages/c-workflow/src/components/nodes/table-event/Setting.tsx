import React, { FC } from 'react';
import { ITableEventNodeConfig } from '@brick/types';
import { SettingFormItem } from '../../common';

export interface IPanelTableEventProps {
  data: ITableEventNodeConfig;
}

const Setting: FC<IPanelTableEventProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <SettingFormItem
        title={'触发事件'}
        formItemProps={{
          name: ['trigger'],
        }}
      >
        <div>table event</div>
      </SettingFormItem>
    </div>
  );
};

export default Setting;
