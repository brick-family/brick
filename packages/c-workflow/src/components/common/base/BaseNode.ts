import { async } from '@antv/x6/lib/registry/marker/async';
import { ENodeType, IBaseNodeConfig, IWorkflowNodeData, TNodeType } from '@brick/types';
import React, { FunctionComponent } from 'react';

export type TLazyFunctionComponent = React.LazyExoticComponent<React.FunctionComponent<any>>;

export interface ISettingPanelMetaData {
  /**
   * 名称
   */
  name: string;
  /**
   * 类型
   */
  type: TNodeType;

  icon: string | React.ReactNode;
}

export interface INodeComponentProps<T extends ENodeType = any> {
  nodeData: IWorkflowNodeData<T>;
}

export interface ISettingComponentProps<T extends ENodeType = any> {
  nodeData: IWorkflowNodeData<T>;
}

export interface INodeModuleValue {
  nodeComponent: FunctionComponent<INodeComponentProps>;

  settingComponent: FunctionComponent<ISettingComponentProps>;

  metaData: ISettingPanelMetaData;

  defaultNodeConfigData: IBaseNodeConfig;

  validation: (nodeData: IBaseNodeConfig) => Promise<IValidationResult>;
}

export type TNodeModuleMap = Record<TNodeType, INodeModuleValue>;

/**
 * 校验结果
 */
export interface IValidationResult {
  valid: boolean;
  message?: string;
}

export abstract class BaseNode {
  static getNodeElement = (): TLazyFunctionComponent => {
    throw new Error('node element component is not implemented');
  };

  static getSettingPanel = (): TLazyFunctionComponent => {
    throw new Error('Setting panel component is not implemented');
  };

  static getMetadata = (): ISettingPanelMetaData => {
    throw new Error('metaData is not implemented');
  };

  static getDefaultConfigData = (): IBaseNodeConfig => {
    throw new Error('default config data is not implemented');
  };

  static validation = async (nodeData: any): Promise<IValidationResult> => {
    return { valid: true };
  };
}
