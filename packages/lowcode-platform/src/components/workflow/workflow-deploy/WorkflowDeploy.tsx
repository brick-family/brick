import { deployFlowModel } from '@brick/services';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { FC } from 'react';

export interface IWorkflowDeployProps {
  /**
   * 当前流程的modelId
   */
  modeId: string;

  /**
   * 发布成功回调
   */
  onDeploySuccess?: () => void;

  onDeployBefore?: () => Promise<void>;
}

/**
 * 发布流程按钮
 * @param props
 * @returns
 */
export const WorkflowDeploy: FC<IWorkflowDeployProps> = (props) => {
  const { modeId, onDeploySuccess, onDeployBefore } = props;
  const { loading, data, runAsync } = useRequest(deployFlowModel, {
    manual: true,
  });

  const handleDeploy = async () => {
    try {
      await onDeployBefore?.();
      await runAsync(modeId);
      onDeploySuccess?.();
      message.success('发布成功！');
    } catch (error) {}
  };
  return (
    <Button type="primary" loading={loading} onClick={handleDeploy}>
      发布流程
    </Button>
  );
};
