import * as React from 'react';
import { createElement } from 'react';
import { Input } from 'antd';
import './index.scss';

export interface AntdInputProps {
  color?: 'string';
  style?: 'object'
}

const MySelect: React.FC<AntdInputProps> = function MySelect({
  color,
  style = {},
  ...otherProps
}) {
  const _style = style || {};
  if (color) {
    _style.backgroundColor = color;
  }
  const _otherProps = otherProps || {};
  _otherProps.style = _style;
  return (
    <Input {..._otherProps} />
  );
};

export default MySelect;
