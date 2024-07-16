import React, { FC } from 'react';
import { Radio, Space, SpaceProps } from 'antd';
import { IFromItemValue } from '../setting-form-item';

export interface ISettingRadioGroupProps extends IFromItemValue<any> {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  direction?: SpaceProps['direction'];
  options: Array<{ value: string; label: string }>;
}

export const SettingRadioGroup: FC<ISettingRadioGroupProps> = (props) => {
  const { className, value, onChange, disabled, direction, options } = props;

  return (
    <Radio.Group className={className} disabled={disabled} value={value} onChange={onChange}>
      <Space direction={direction}>
        {options?.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
