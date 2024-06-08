import React, { FC } from 'react';
import { Checkbox, Space, SpaceProps } from 'antd';
import { IFromItemValue } from '../setting-form-item';

export interface ISettingCheckboxGroupProps extends IFromItemValue<Array<any>> {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  direction?: SpaceProps['direction'];
  options: Array<{ value: string; label: string }>;
}

/**
 * 设置项多选
 * @param props
 * @constructor
 */
export const SettingCheckboxGroup: FC<ISettingCheckboxGroupProps> = (props) => {
  const { className, value, onChange, disabled, direction, options } = props;
  return (
    <Checkbox.Group className={className} disabled={disabled} value={value} onChange={onChange}>
      <Space direction={direction}>
        {options?.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
};
