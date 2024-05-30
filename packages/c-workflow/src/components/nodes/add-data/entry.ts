import React from 'react';
import { ENodeType } from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';

export class AddDataNode extends BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./AddData'));
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./Setting'));
  };

  static getMetadata = (): ISettingPanelMetaData => {
    return {
      name: '新增数据',
      type: ENodeType.AddData,
      icon: React.createElement(PlusOutlined),
    };
  };
}
