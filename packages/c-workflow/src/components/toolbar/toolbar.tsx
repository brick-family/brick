import { ActionGroup, ActionIconGroupItemType } from '@ant-design/pro-editor';
import classNames from 'classnames';
import React, { FC, memo, useState } from 'react';
import { useWorkflowAppSelector } from '../../processor';
import s from './toolbar.less';
import {
  DragOutlined,
  EnvironmentOutlined,
  FullscreenOutlined,
  RedoOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import { MinMap } from './min-map';
import { useUpdate } from 'ahooks';

export interface IToolbarProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Toolbar: FC<IToolbarProps> = memo((props) => {
  const { style, className } = props;
  // const [graph, setGraphCenter, setGraphContentCenter, setMinMapElement] = useWorkflowAppSelector(
  //   (s) => [
  //     s.graphProcessor.graph,
  //     s.graphProcessor.setGraphCenter,
  //     s.graphProcessor.setGraphContentCenter,
  //     s.graphProcessor.setMinMapElement,
  //   ]
  // );
  const update = useUpdate();

  const [visible, setVisible] = useState(false);

  const customItems: ActionIconGroupItemType[] = [
    {
      icon: <DragOutlined />,
      title: '快速定位',
      onClick: () => {
        // setGraphContentCenter?.();
      },
    },
    { icon: <UndoOutlined />, title: '撤销' },
    { icon: <RedoOutlined />, title: '重做' },
    {
      type: 'divider',
    },
    {
      icon: <FullscreenOutlined />,
      title: '全屏',
      onClick: () => {},
    },
    {
      icon: <EnvironmentOutlined />,
      title: '小地图',
      onClick: () => {
        setVisible(!visible);
      },
    },
  ];

  const customItems2: ActionIconGroupItemType[] = [
    {
      icon: <ZoomOutOutlined />,
      title: '缩小！',
      onClick: () => {
        // graph?.zoom(-0.1); // 将画布缩放级别减少 0.1
        update();
      },
    },
    // {
    //   icon: `${Math.floor((graph?.zoom() || 1) * 100)}%`,
    //   style: {
    //     background: 'unset',
    //     margin: '0 4px',
    //   },
    // },
    {
      icon: <ZoomInOutlined />,
      title: '放大！',
      onClick: () => {
        // graph?.zoom(0.1); // 将画布缩放级别减少 0.1
        update();
      },
    },
    {
      type: 'divider',
    },
  ];

  return (
    <>
      <div style={style} className={classNames(s.toolbar, className)}>
        <Space>
          <ActionGroup items={[...customItems2, ...customItems]} />
          {/*<ActionGroup items={customItems}/>*/}
        </Space>
        {/* {<MinMap style={{ opacity: visible ? 1 : 0 }} className={s.minmap} />} */}
      </div>
    </>
  );
});
