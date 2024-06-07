import { Node } from '@antv/x6';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import s from './node.module.less';
import { useWorkflowAppSelector } from '../../../../processor';
import { ENodeType, IWorkflowNodeData } from '@brick/types';
import { PANEL_ALL_DATA } from '../../../../constants';

export interface INodeContainerProps {
  style?: React.CSSProperties;
  className?: string;
  icon?: string;
  title: string;
}

export const NodeContainer = ({ node }: { node: Node }) => {
  const [graphProcessor, setActiveNodeById, activeNode, nodeModule] = useWorkflowAppSelector(
    (s) => [s.graphProcessor, s.setActiveNodeById, s.activeNode, s.nodeModule]
  );

  const nodeId = node.id;

  const nodeType = node?.data?.type as ENodeType;
  // 是否激活
  const isActive = activeNode?.id === nodeId;

  const data = node.getData<IWorkflowNodeData>();

  const panelData = useMemo(() => {
    return PANEL_ALL_DATA.find((f) => f.type === data.type);
  }, [data.type]);

  const onNodeClick = () => {
    setActiveNodeById(nodeId, nodeType);
  };

  const NodeComponent = nodeModule?.[nodeType]?.nodeComponent;

  return (
    <div
      className={classNames(s.node, {
        [s.selected]: isActive,
        [s.end]: data.type === ENodeType.End,
      })}
      onClick={onNodeClick}
    >
      <div className={s.title}>
        <span className={s.icon}>{panelData?.icon}</span>
        <span>{panelData?.label}</span>
      </div>
      <div className={s.content}>{NodeComponent && <NodeComponent nodeData={activeNode!} />}</div>
    </div>
  );
};
