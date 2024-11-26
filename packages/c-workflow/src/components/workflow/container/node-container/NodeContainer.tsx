import classNames from 'classnames';
import React, { useMemo } from 'react';

import s from './nodeContainer.module.less';
import { useWorkflowAppSelector } from '../../../../processor';
import { ENodeType, IWorkflowLayoutItem, IWorkflowNodeData } from '@brick/types';
import { PANEL_ALL_DATA } from '../../../../constants';
import { CopyOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { BLoading } from '@brick/component';
import { NodeAdd } from '../../../common';

export interface INodeContainerProps {
  style?: React.CSSProperties;
  className?: string;
  layoutItem: IWorkflowLayoutItem;
  /**
   * 是否显示箭头
   */
  showArrow?: boolean;
}

export const NodeContainer = (props: INodeContainerProps) => {
  const { layoutItem, showArrow = true } = props;

  const [
    setActiveNodeById,
    activeNode,
    nodeModule,
    nodeMap,
    removeNodeData,
    copyNodeData,
    errorNodeData,
  ] = useWorkflowAppSelector((s) => [
    s.setActiveNodeById,
    s.activeNode,
    s.nodeModule,
    s.workflowData.nodeMap,
    s.removeNodeData,
    s.copyNodeData,
    s.nodeProcessor.errorNodeData,
  ]);

  const nodeId = layoutItem?.id;
  // const nodeId = node.id;
  const nodeData = nodeMap?.[nodeId];
  const nodeType = nodeData.type;
  // 是否激活
  const isActive = activeNode?.id === nodeId;
  const isError = errorNodeData?.id === nodeId;

  const currNode = nodeMap?.[nodeId];
  const isEnd = nodeData.type === ENodeType.End;

  // 节点大小
  const size = useMemo(() => {
    if (nodeData.type === ENodeType.ProcessStart) {
      return 'small';
    }
    return 'medium';
  }, [nodeData.type]);

  const panelData = useMemo(() => {
    return PANEL_ALL_DATA.find((f) => f.type === nodeData.type);
  }, [nodeData.type]);

  const onNodeClick = () => {
    if (nodeType === ENodeType.End) {
      return;
    }
    console.log('q=>node-click', nodeId, nodeType);
    setActiveNodeById(nodeId, nodeType);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 工作流 nodeMap 复制节点 (复制节点数据)
    // const newNode = copyNodeData(nodeId, newNodeId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 删除节点数据
    removeNodeData(nodeId);
  };

  const NodeComponent = nodeModule?.[nodeType]?.nodeComponent;

  // 是否有toolbar
  const hasToolbar = ![ENodeType.End, ENodeType.TableEvent, ENodeType.ProcessStart].includes(
    nodeType as any
  );

  // 渲染node节点组件
  const renderNodeComponent = () => {
    return (
      <React.Suspense fallback={<BLoading />}>
        {NodeComponent && currNode && <NodeComponent nodeData={currNode!} />}
      </React.Suspense>
    );
  };

  const renderConditionContainer = () => {
    return (
      <>
        <div className={s.conditionTitle}>
          <span>{currNode?.name || panelData?.label}</span>
        </div>
        {!isEnd && (
          <div className={s.content}>
            <div className={s.left}>{renderNodeComponent()}</div>
            <RightOutlined style={{ marginLeft: 4, color: '#555', fontSize: 14 }} />
          </div>
        )}
      </>
    );
  };

  const renderContainer = () => {
    return (
      <>
        <div className={s.title}>
          <span className={s.icon}>{panelData?.icon}</span>
          <span>{currNode?.name || panelData?.label}</span>
        </div>
        {!isEnd && (
          <div className={s.content}>
            <div className={s.left}>{renderNodeComponent()}</div>
            <RightOutlined style={{ marginLeft: 4, color: '#555', fontSize: 14 }} />
          </div>
        )}
      </>
    );
  };

  const renderEmptyContainer = () => {
    return (
      <div className={s['title-empty']}>
        <span className={s.icon}>{panelData?.icon}</span>
        <span>{panelData?.label}</span>
        <RightOutlined style={{ fontSize: 12 }} />
      </div>
    );
  };

  const renderNode = () => {
    if (nodeType === ENodeType.ProcessStart) {
      return renderEmptyContainer();
    }

    if (nodeType === ENodeType.ConditionItem) {
      return renderConditionContainer();
    }

    return renderContainer();
  };

  return (
    <div
      node-id={layoutItem.id}
      className={classNames(
        s.node,
        {
          [s.small]: size === 'small',
        },
        'workflow-node'
      )}
    >
      <div
        className={classNames(s.container, {
          [s['container-small']]: size === 'small',
          [s.selected]: isActive,
          [s.error]: isError,
          [s.end]: isEnd,
        })}
        onClick={onNodeClick}
      >
        {renderNode()}

        {hasToolbar && (
          <div className={s.toolbar}>
            <Space size={4}>
              <Button
                onClick={handleCopy}
                type="text"
                size={'small'}
                className={s.item}
                icon={<CopyOutlined />}
              ></Button>
              <Button
                onClick={handleDelete}
                type="text"
                size={'small'}
                className={s.item}
                icon={<DeleteOutlined />}
              ></Button>
            </Space>
          </div>
        )}
      </div>
      <NodeAdd className="workflow-node-add" showArrow={showArrow} sourceNodeId={nodeId} />
    </div>
  );
};
