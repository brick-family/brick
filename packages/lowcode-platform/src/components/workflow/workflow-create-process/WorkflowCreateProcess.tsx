import { createWorkflow } from '@brick/services';
import { IWorkflowEntity, WorkflowAppProcessor } from '@brick/workflow';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { FC } from 'react';
import { getWorkflowSaveRequestData } from '../workflow-save';

export interface IWorkflowCreateProcessProps {
  /**
   * 当前流程的modelId
   */
  modeId: string;

  /**
   * 当前创建流程的版本号
   */
  createVersion: number;

  workflowAppInstance: WorkflowAppProcessor;

  /**
   * 发布成功回调
   */
  onCreateSuccess?: (workflowEntity: IWorkflowEntity) => void;
}

export const WorkflowCreateProcess: FC<IWorkflowCreateProcessProps> = (props) => {
  const { modeId, onCreateSuccess, workflowAppInstance, createVersion } = props;
  const { loading, data, runAsync } = useRequest(createWorkflow, {
    manual: true,
  });

  const handleCreate = async () => {
    const reqData = await getWorkflowSaveRequestData({
      modeId,
      workflowAppInstance,
      isNewVersion: true,
      createVersion,
    });

    try {
      if (!reqData) return;
      const result = await runAsync(reqData);
      onCreateSuccess?.(result);
      message.success('保存成功！');
    } catch (error) {}
  };
  return (
    <Button type="primary" loading={loading} onClick={handleCreate}>
      创建新流程
    </Button>
  );
};
