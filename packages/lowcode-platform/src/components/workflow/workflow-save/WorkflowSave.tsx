import { IUpdateWorkflowParams, updateWorkflow } from '@brick/services';
import { getProcessXMLModel } from '@brick/utils';
import { IProcessXMLModel, WorkflowAppProcessor } from '@brick/workflow';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { FC, memo } from 'react';

export interface IWorkflowSaveProps {
  /**
   * 当前流程的modelId
   */
  modeId: string;
  workflowAppInstance: WorkflowAppProcessor;
}

export const WorkflowSave: FC<IWorkflowSaveProps> = memo((props) => {
  const { workflowAppInstance, modeId } = props;

  const { loading, data, runAsync } = useRequest(updateWorkflow, {
    manual: true,
  });

  const handleSave = async () => {
    const workflowData = workflowAppInstance?.workflowData?.get?.();

    const validResult = await workflowAppInstance?.validNodeData();
    if (!validResult) {
      return;
    }

    // TODO 重新调整el data
    const processNodeData = workflowAppInstance?.getProcessNodeData();
    console.log('q=>processNodeData', processNodeData);
    if (!processNodeData) {
      message.error('请添加节点');
      return;
    }

    const processXMLModel = getProcessXMLModel({
      modelId: `${modeId}`,
      workflowEntity: workflowData,
      processNode: processNodeData,
    });

    const result: IUpdateWorkflowParams = { ...workflowData, processXMLModel };

    try {
      await runAsync(result);
      message.success('保存成功！');
    } catch (error) {}
  };

  return (
    <Button loading={loading} onClick={handleSave}>
      保存
    </Button>
  );
});
