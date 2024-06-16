import { Edge } from '@antv/x6';
import React, { FC, memo, useMemo } from 'react';
import { WORKFLOW_TABLE_NODE_DATA } from '../../constants';
import { getWorkflowProcessor } from '../../processor/WorkflowAppManager';
import { EWorkflowType, IPanelDataNode } from '../../types';
import s from './lable.less';
import { uuid } from '@brick/core';

export interface ILabelContentProps {
  edge: Edge<Edge.Properties>;
  setOpen?: (open: boolean) => void;
}

export const EdgeLabelContent: FC<ILabelContentProps> = memo((props) => {
  const workflowProcessor = getWorkflowProcessor();
  const type = workflowProcessor?.workflowData?.get()?.type;

  const data = useMemo(() => {
    if (type === EWorkflowType.table) {
      return WORKFLOW_TABLE_NODE_DATA;
    }
    return WORKFLOW_TABLE_NODE_DATA;
  }, [type]);

  const handleAddNode = (node: IPanelDataNode) => {
    const id = uuid();
    // 添加拓扑数据
    workflowProcessor?.graphProcessor?.addNodeByEdge({
      nodeType: node.type,
      edge: props.edge,
      data: { id },
    });

    // 添加节点数据
    workflowProcessor.addNodeData(node.type, { id });
    workflowProcessor.setActiveNodeById(id);

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
