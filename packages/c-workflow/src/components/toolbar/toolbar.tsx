import { FullscreenOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { ActionGroup, ActionIconGroupItemType } from '@ant-design/pro-editor';
import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { useWorkflowSelector } from '../../processor';
import s from './toolbar.less';

export interface IToolbarProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Toolbar: FC<IToolbarProps> = memo((props) => {
  const { style, className } = props;
  const [graph] = useWorkflowSelector((s) => [s.graph]);

  const zoom = () => {
    console.log('q=>12');
    graph?.zoom(1); // 将画布缩放级别减少 0.2
  };

  const customItems: ActionIconGroupItemType[] = [
    {
      icon: <FullscreenOutlined />,
      title: '全屏',
      onClick: () => {},
    },
    {
      icon: <ZoomInOutlined />,
      title: '放大！',
      onClick: () => {},
    },
    {
      icon: <ZoomOutOutlined />,
      style: {
        color: '#1890ff',
      },
      title: '缩小！',
      onClick: () => {},
    },
    // {
    //   type: 'divider',
    // },
    // {
    //   icon: <DragOutlined/>,
    //   title: '快速定位',
    // },
  ];

  return (
    <div style={style} className={classNames(s.toolbar, className)}>
      <ActionGroup items={customItems} />
    </div>
  );
});
