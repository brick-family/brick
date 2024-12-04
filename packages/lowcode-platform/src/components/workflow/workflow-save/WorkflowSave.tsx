import { IWorkflowCreateAndUpdateDto, updateWorkflow } from '@brick/services';
import { getProcessXMLModel } from '@brick/utils';
import { IProcessXMLModel, WorkflowAppProcessor } from '@brick/workflow';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { FC, memo, useImperativeHandle } from 'react';

/**
 * 获取工作流的创建和更新数据
 * @param params
 * @returns
 */
export const getWorkflowSaveRequestData = async (params: {
  modeId: string;
  workflowAppInstance: WorkflowAppProcessor;
  isNewVersion?: boolean;
  createVersion?: number;
}) => {
  const { workflowAppInstance, modeId, isNewVersion = false, createVersion } = params;
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

  const processXMLModel: IProcessXMLModel = getProcessXMLModel({
    modelId: `${modeId}`,
    workflowEntity: workflowData,
    processNode: processNodeData,
  });

  const result: IWorkflowCreateAndUpdateDto = {
    ...workflowData,
    processXMLModel,
    newVersion: isNewVersion,
  };
  if (isNewVersion) {
    delete result.id;
    result.version = createVersion;
  }

  return result;
};

export interface IWorkflowSaveProps {
  /**
   * 当前流程的modelId
   */
  modeId: string;
  workflowAppInstance: WorkflowAppProcessor;
}

export interface IWorkflowSaveRef {
  save: () => Promise<boolean>;
}

export const WorkflowSave = React.forwardRef<IWorkflowSaveRef, IWorkflowSaveProps>((props, ref) => {
  const { workflowAppInstance, modeId } = props;

  const { loading, data, runAsync } = useRequest(updateWorkflow, {
    manual: true,
  });

  const save = async () => {
    const result = await getWorkflowSaveRequestData({
      modeId,
      workflowAppInstance,
      isNewVersion: false,
    });

    if (result) {
      return await runAsync(result);
    }
    return false;
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        save,
      };
    },
    [modeId, workflowAppInstance]
  );

  const handleSave = async () => {
    try {
      await save();
      message.success('保存成功！');
    } catch (error) {}
  };

  return (
    <Button loading={loading} onClick={handleSave}>
      保存
    </Button>
  );
});
