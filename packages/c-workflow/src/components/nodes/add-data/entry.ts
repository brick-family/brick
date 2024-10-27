import React from 'react';
import { ENAddDataType, ENodeType, IAddDataNodeConfig, IBaseNodeConfig } from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import {
  BaseNode,
  ISettingPanelMetaData,
  IValidationResult,
  TLazyFunctionComponent,
} from '../../common';
import { getAppId } from '@brick/utils';

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

  static getDefaultConfigData = () => {
    return {
      type: ENAddDataType.single,
      appId: getAppId(),
    } as IAddDataNodeConfig;
  };

  static validation = async (nodeData: IBaseNodeConfig): Promise<IValidationResult> => {
    const config = nodeData as IAddDataNodeConfig;
    return {
      valid: true,
    };
  };
}
