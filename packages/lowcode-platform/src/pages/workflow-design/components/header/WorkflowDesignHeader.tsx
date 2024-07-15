import React, { FC, useEffect } from 'react';
import s from './workflowDesignHeader.less';
import { BEditInput } from '@brick/component';
import { useWorkflowDesignSelector } from '@/pages/workflow-design/workflow-design-processor';
import { history, useParams } from 'umi';
import { Button, message, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

export interface IWorkflowName {
  name: string;
}

const WorkflowName = (props: IWorkflowName) => {
  const [workflow, updateWorkflow] = useWorkflowDesignSelector((s) => [
    s.workflowProcessor.getWorkflowResponse,
    s.workflowProcessor.updateWorkflow,
  ]);

  const handleSave = async (name: string) => {
    return await updateWorkflow({
      name: name,
      id: workflow?.data?.id!,
    });
  };

  return <BEditInput name={props.name} onSave={handleSave} />;
};

export interface IWorkflowDesignHeaderProps {}

export const WorkflowDesignHeader: FC<IWorkflowDesignHeaderProps> = (props) => {
  const { wId, aId } = useParams();
  const [
    getWorkflow,
    workflowResponse,
    workflowAppInstance,
    updateWorkflow,
    updateWorkflowResponse,
  ] = useWorkflowDesignSelector((s) => [
    s.workflowProcessor.getWorkflow,
    s.workflowProcessor.getWorkflowResponse,
    s.workflowAppInstance,
    s.workflowProcessor.updateWorkflow,
    s.workflowProcessor.updateWorkflowResponse,
  ]);
  useEffect(() => {
    if (wId) {
      getWorkflow(wId);
    }
  }, [wId]);

  const handleSave = async () => {
    const graphData = workflowAppInstance?.graphProcessor.getData();
    const workflowData = workflowAppInstance?.workflowData?.get?.();

    const elConfig = workflowAppInstance?.getLiteFlowElData();

    console.log('q=>elConfig', elConfig, graphData, workflowData);

    const result = { ...workflowData, graph: graphData, elData: elConfig };

    await updateWorkflow(result, {
      onError() {
        message.error('修改失败！');
      },
    });
  };

  const handleDeploy = () => {};

  const goBack = () => {
    history.push(`/app/${aId}/workflow`);
  };

  return (
    <div className={s.header}>
      <div className={s.left}>
        <Button onClick={goBack} icon={<LeftOutlined />} type={'text'}></Button>
        <WorkflowName name={workflowResponse?.data?.name} />
      </div>

      <div className={s.right}>
        <Space>
          <Button loading={updateWorkflowResponse.loading} onClick={handleSave}>
            保存
          </Button>
          <Button type="primary" onClick={handleDeploy}>
            发布
          </Button>
        </Space>
      </div>
    </div>
  );
};
