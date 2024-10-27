import React, { FC, memo, useMemo } from 'react';
import s from './nodeAdd.module.less';
import { uuid } from '@brick/core';
import { WORKFLOW_TABLE_NODE_DATA } from '../../../constants';
import { getWorkflowProcessor } from '../../../processor/WorkflowAppManager';
import { ENodeType, EWorkflowType, IPanelDataNode } from '@brick/types';

export interface INodeAddContentProps {
  setOpen?: (open: boolean) => void;
  /**
   * 当前添加的节点id
   */
  sourceNodeId: string;
}

export const NodeAddContent: FC<INodeAddContentProps> = memo((props) => {
  const { sourceNodeId } = props;
  const workflowProcessor = getWorkflowProcessor();
  const type = workflowProcessor?.workflowData?.get()?.type;

  const data = useMemo(() => {
    if (type === EWorkflowType.table) {
      return WORKFLOW_TABLE_NODE_DATA;
    }
    return WORKFLOW_TABLE_NODE_DATA;
  }, [type]);

  const handleAddNode = (node: IPanelDataNode) => {
    // 添加节点数据
    const newNode = workflowProcessor.addNodeData({
      sourceNodeId,
      nodeType: node.type,
      // defaultNodeData: { id },
    });
    props?.setOpen?.(false);
  };

  return (
    <div className={s.content}>
      {data?.map((group) => {
        return (
          <div className={s.group} key={group.id}>
            <div className={s.label}>{group.label}</div>
            {group.children?.map((item) => {
              return (
                <div onClick={() => handleAddNode(item as any)} className={s.item} key={item.id}>
                  <div className={s.ic}>{item.icon}</div>
                  <div>{item.label}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});
