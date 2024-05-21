import React, { FC } from 'react';
import { Col } from 'antd';

export interface IColProps {
  children?: React.ReactNode;
}

export const FieldLayoutCol: FC<IColProps> = (props) => {
  return <div style={{ width: '100%', height: '100%' }}>{props.children}</div>;
};
