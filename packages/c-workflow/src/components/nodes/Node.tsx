import { Node } from '@antv/x6';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { PANEL_ALL_DATA } from '../../constants';
import { useWorkflowSelector } from '../../processor';
import { ENodeType, INodeData } from '../../types';
import s from './node.less';

export interface INodeProps {
  style?: React.CSSProperties;
  className?: string;
  icon?: string;
  title: string;
}

export const NodeComponent = ({ node }: { node: Node }) => {
  const [graph, setActiveNode, activeNode] = useWorkflowSelector((s) => [
    s.graph,
    s.setActiveNode,
    s.activeNode,
  ]);

  // 是否激活
  const isActive = activeNode?.id === node.id;

  const data = node.getData<INodeData>();

  const panelData = useMemo(() => {
    return PANEL_ALL_DATA.find((f) => f.type === data.type);
  }, [data.type]);

  const onNodeClick = () => {
    setActiveNode(node);
  };

  return (
    <div
      className={classNames(s.node, {
        [s.selected]: isActive,
        [s.end]: data.type === ENodeType.End,
      })}
      onClick={onNodeClick}
    >
      <div className={s.title}>
        <div className={s.icon}>
          {panelData?.icon}
          <span>{panelData?.label}</span>
        </div>
      </div>
      <div className={s.content}></div>
    </div>
  );
};
