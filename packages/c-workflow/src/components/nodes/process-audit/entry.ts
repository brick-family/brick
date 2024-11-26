import React from 'react';
import {
  ENodeType,
  INodeValidationResult,
  IProcessAuditNodeConfig,
  IWorkflowNodeData,
} from '@brick/types';
import { PlusOutlined } from '@ant-design/icons';
import { BaseNode, ISettingPanelMetaData, TLazyFunctionComponent } from '../../common';

export class ProcessAuditNode extends BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./ProcessAudit'));
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    return React.lazy(() => import('./Setting'));
  };

  static getMetadata = (): ISettingPanelMetaData => {
    return {
      name: '流程审批',
      type: ENodeType.ProcessAudit,
      icon: React.createElement(PlusOutlined),
    };
  };

  static getDefaultConfigData = () => {
    return {} as IProcessAuditNodeConfig;
  };

  static validation = async (
    nodeData: IWorkflowNodeData<ENodeType.ProcessAudit>
  ): Promise<INodeValidationResult> => {
    const config = nodeData?.config; // 类型断研

    return { valid: true };
  };
}
