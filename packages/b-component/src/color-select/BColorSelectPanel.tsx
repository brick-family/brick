import React, { FC } from 'react';
import { Space } from 'antd';
import { BaseColor } from './base-color';
import { IColorSelectProps } from './BColorSelect';

export const BColorSelectPanel: FC<IColorSelectProps> = (props) => {
  return (
    <Space direction="vertical" style={{ maxWidth: 288 }}>
      <Space direction="vertical">
        <span>推荐颜色:</span>
        <BaseColor {...props} />
      </Space>
      {/*<Space direction="vertical">*/}
      {/*  <span>自定义:</span>*/}
      {/*  <CustomerColor {...props} />*/}
      {/*</Space>*/}
    </Space>
  );
};
