import React from 'react';
import { ENodeType } from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';

export class TableEventNode extends BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./TableEvent'));
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./Setting'));
  };

  static getMetadata = (): ISettingPanelMetaData => {
    return {
      name: '表单事件触发',
      type: ENodeType.TableEvent,
      icon: React.createElement(PlusOutlined),
    };
  };
}
