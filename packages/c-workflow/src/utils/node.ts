import * as nodes from '../components/nodes';
import { INodeModuleValue, TNodeModuleMap } from '../components/common';
import { uuid } from '@brick/core';
import { IWorkflowNodeData, TNodeType } from '@brick/types';

/**
 * 获取node module
 */
export const getNodeModule = () => {
  const result: TNodeModuleMap = {} as TNodeModuleMap;

  Object.values(nodes).forEach((item) => {
    const metaData = item.getMetadata();
    const nodeType = metaData.type;

    const nodeModuleValue: INodeModuleValue = {
      nodeComponent: item.getNodeElement(),
      settingComponent: item.getSettingPanel(),
      metaData,
      defaultNodeConfigData: item.getDefaultConfigData?.() || {},
    };
    result[nodeType] = nodeModuleValue;
  });

  return result;
};

/**
 * 获取默认节点配置
 * @param nodeType
 * @param options
 */
export const getDefaultNodeData = (
  nodeType: TNodeType,
  options?: {
    defaultNodeData?: Partial<IWorkflowNodeData>;
    // 是否用node type当id
    useNodeTypeId?: boolean;
  }
) => {
  const { defaultNodeData, useNodeTypeId } = options || {};

  const nodeModule = getNodeModule();

  const { metaData, defaultNodeConfigData } = nodeModule?.[nodeType] || {};
  return {
    id: useNodeTypeId ? nodeType : uuid(),
    type: nodeType,
    name: metaData?.name,
    config: defaultNodeConfigData || {},
    ...defaultNodeData,
  } as IWorkflowNodeData;
};
