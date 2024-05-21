import { useMemoizedFn } from 'ahooks';
import { Drawer } from 'antd';
import React, { FC, memo } from 'react';
import { useWorkflowSelector } from '../../../processor';

export interface ISettingContainerProps {}

export const SettingContainer: FC<ISettingContainerProps> = memo((props) => {
  const [activeNode, clearActiveNode] = useWorkflowSelector((s) => [
    s.activeNode,
    s.clearActiveNode,
  ]);

  const onClose = useMemoizedFn(() => {
    clearActiveNode();
  });

  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={Boolean(activeNode)}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      {JSON.stringify(activeNode?.data)}
    </Drawer>
  );
});
