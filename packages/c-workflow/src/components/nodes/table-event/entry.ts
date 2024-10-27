import React from 'react';
import { ENodeType, IBaseNodeConfig, ITableEventNodeConfig, IWorkflowNodeData } from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import {
  BaseNode,
  ISettingPanelMetaData,
  IValidationResult,
  TLazyFunctionComponent,
} from '../../common';

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

  static getDefaultConfigData = () => {
    return {} as ITableEventNodeConfig;
  };

  static validation = async (
    nodeData: IWorkflowNodeData<ENodeType.TableEvent>
  ): Promise<IValidationResult> => {
    const config = nodeData?.config; // 类型断研
    console.log('q=>config', config);
    if (!config.triggerEvent) {
      return { valid: false, message: '触发事件不能为空' };
    }

    return { valid: true };
  };
}
