import React, { FC } from 'react';
import { ColorPicker } from 'antd';
import { IColorSelectProps } from '../BColorSelect';
import { Color } from 'antd/es/color-picker';
import { isCustomerColor } from '../utils';

export const CustomerColor: FC<IColorSelectProps> = ({ color, onSelect }) => {
  const onChange = (color: Color) => {
    onSelect?.(color.toHexString());
  };
  const customerColor = isCustomerColor(color!);
  return (
    <ColorPicker value={customerColor ? color : null} allowClear onChangeComplete={onChange} />
  );
};
