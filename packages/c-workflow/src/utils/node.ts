import * as nodes from '../components/nodes';
import { INodeModuleValue, TNodeModuleMap } from '../components/common';

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
    };
    result[nodeType] = nodeModuleValue;
  });

  return result;
};
