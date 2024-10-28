import React from 'react';
import {
  ENAddDataType,
  ENodeType,
  IAddDataNodeConfig,
  IBaseNodeConfig,
  INodeValidationResult,
  IWorkflowNodeData,
} from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';
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

  static validation = async (
    nodeData: IWorkflowNodeData<ENodeType.AddData>
  ): Promise<INodeValidationResult> => {
    const config = nodeData.config;

    if (!config.appId) {
      return {
        valid: false,
        message: '应用不能为空',
      };
    }
    if (!config.tableId) {
      return {
        valid: false,
        message: '表格不能为空',
      };
    }
    return {
      valid: true,
    };
  };
}
