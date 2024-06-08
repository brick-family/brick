import { Node } from '@antv/x6';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import s from './node.module.less';
import { useWorkflowAppSelector } from '../../../../processor';
import { ENodeType, IWorkflowNodeData } from '@brick/types';
import { PANEL_ALL_DATA } from '../../../../constants';
import { RightOutlined } from '@ant-design/icons';

export interface INodeContainerProps {
  style?: React.CSSProperties;
  className?: string;
  icon?: string;
  title: string;
}

export const NodeContainer = ({ node }: { node: Node }) => {
  const [graphProcessor, setActiveNodeById, activeNode, nodeModule, nodeMap] =
    useWorkflowAppSelector((s) => [
      s.graphProcessor,
      s.setActiveNodeById,
      s.activeNode,
      s.nodeModule,
      s.workflowData.nodeMap,
    ]);

  const nodeId = node.id;

  const nodeType = node?.data?.type as ENodeType;
  // 是否激活
  const isActive = activeNode?.id === nodeId;

  const currNode = nodeMap?.[nodeId];
  const data = node.getData<IWorkflowNodeData>();
  const isEnd = data.type === ENodeType.End;

  const panelData = useMemo(() => {
    return PANEL_ALL_DATA.find((f) => f.type === data.type);
  }, [data.type]);

  const onNodeClick = () => {
    if (nodeType === ENodeType.End) {
      return;
    }
    setActiveNodeById(nodeId, nodeType);
  };

  const NodeComponent = nodeModule?.[nodeType]?.nodeComponent;

  return (
    <div
      className={classNames(s.node, {
        [s.selected]: isActive,
        [s.end]: isEnd,
      })}
      onClick={onNodeClick}
    >
      <div className={s.title}>
        <span className={s.icon}>{panelData?.icon}</span>
        <span>{currNode?.name || panelData?.label}</span>
      </div>
      {!isEnd && (
        <div className={s.content}>
          <div className={s.left}>{NodeComponent && <NodeComponent nodeData={currNode!} />}</div>
          <RightOutlined style={{ marginLeft: 4, color: '#555', fontSize: 16 }} />
        </div>
      )}
    </div>
  );
};
