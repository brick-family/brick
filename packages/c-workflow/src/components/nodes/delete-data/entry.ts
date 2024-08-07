import React from 'react';
import { ENodeType, IDeleteDataNodeConfig } from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';

export class DeleteDataNode extends BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./DeleteData'));
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./Setting'));
  };

  static getMetadata = (): ISettingPanelMetaData => {
    return {
      name: '删除数据',
      type: ENodeType.DeleteData,
      icon: React.createElement(PlusOutlined),
    };
  };

  static getDefaultConfigData = () => {
    return {} as IDeleteDataNodeConfig;
  };
}
