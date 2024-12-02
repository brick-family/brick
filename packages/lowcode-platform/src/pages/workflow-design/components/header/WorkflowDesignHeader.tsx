import React, { FC, useEffect } from 'react';
import s from './workflowDesignHeader.less';
import { BEditInput } from '@brick/component';
import { useWorkflowDesignSelector } from '@/pages/workflow-design/workflow-design-processor';
import { history, useParams } from 'umi';
import { Button, message, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { WorkflowSave } from '../../../../components';

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
  const [getWorkflow, workflowResponse, workflowAppInstance] = useWorkflowDesignSelector((s) => [
    s.workflowProcessor.getWorkflow,
    s.workflowProcessor.getWorkflowResponse,
    s.workflowAppInstance,
  ]);
  useEffect(() => {
    if (wId) {
      getWorkflow(wId);
    }
  }, [wId]);

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
          <WorkflowSave workflowAppInstance={workflowAppInstance!} />
          <Button type="primary" onClick={handleDeploy}>
            发布
          </Button>
        </Space>
      </div>
    </div>
  );
};
