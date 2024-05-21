import React, { FC } from 'react';
import { useWorkflowPageSelector, WorkflowPageProvider } from '@/pages/workflow/workflow-processor';
import { Create } from './create-and-update';
import { List } from '@/pages/workflow/list';
import s from './wokflow.less';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';

export interface IWorkflowContentProps {}

export const WorkflowContent: FC<IWorkflowContentProps> = (props) => {
  const [setModalData, setCreateModalData] = useWorkflowPageSelector((s) => [
    s.modalProcessor.setModalData,
    s.modalProcessor.setCreateModalData,
  ]);

  const handleCreate = () => {
    setCreateModalData();
  };
  return (
    <ProCard style={{ height: '100%' }}>
      <Create />
      <div className={s.toolbar}>
        <Button type={'primary'} onClick={handleCreate}>
          新建自动化
        </Button>
      </div>
      <List />
    </ProCard>
  );
};

export interface IWorkflowPageProps {}

const WorkflowPage: FC<IWorkflowPageProps> = (props) => {
  return (
    <div className={s.bg}>
      <WorkflowPageProvider>
        <WorkflowContent />
      </WorkflowPageProvider>
    </div>
  );
};

export default WorkflowPage;
