import React from 'react';
import {
  ENodeType,
  INodeValidationResult,
  IProcessStartNodeConfig,
  IWorkflowNodeData,
} from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';

export class ProcessStartNode extends BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./ProcessStart'));
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./Setting'));
  };

  static getMetadata = (): ISettingPanelMetaData => {
    return {
      name: '流程发起',
      type: ENodeType.ProcessStart,
      icon: React.createElement(PlusOutlined),
    };
  };

  static getDefaultConfigData = () => {
    return {} as IProcessStartNodeConfig;
  };

  static validation = async (
    nodeData: IWorkflowNodeData<ENodeType.ProcessStart>
  ): Promise<INodeValidationResult> => {
    const config = nodeData?.config; // 类型断研

    return { valid: true };
  };
}
