/**
 *  liteflow el相关工具方法
 */

import { ENodeType, IWorkflowEntity } from '@brick/types';

const IGNORE_NODE_TYPE = [ENodeType.TableEvent, ENodeType.End];

export const hasSubmitWorkflowNode = () => {};

export const convertToLiteFlowScript = (
  levelTree: string[][],
  nodeMap: IWorkflowEntity['nodeMap']
): string => {
  const dataLength = Object.values(nodeMap || {})?.filter(
    (f) => !IGNORE_NODE_TYPE.includes(f?.type as any)
  )?.length;

  // 如果没有可用节点的数据，返回空Script
  if (dataLength <= 0) {
    return '';
  }

  // 内部递归函数
  const generateScript = (levelTree: string[][]): string => {
    let script = '';

    for (const level of levelTree) {
      if (level.length === 1) {
        const nodeId = level[0];
        const node = nodeMap?.[nodeId];

        if (IGNORE_NODE_TYPE.includes(node?.type as any) || !node) {
          continue;
        }

        script += `${node.type}.data('{"id":"${node.id}"}'),`;
      } else {
        script += `IF(${level.join(', ')}),`;
      }
    }

    // 去掉最后多余的逗号
    return script.slice(0, -1);
  };

  // 生成最终脚本
  const liteFlowScript = `THEN(${generateScript(levelTree)});`;

  return liteFlowScript;
};
