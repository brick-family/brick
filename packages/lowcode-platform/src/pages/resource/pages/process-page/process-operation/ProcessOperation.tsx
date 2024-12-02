import { useParams } from '@umijs/max';
import { Space } from 'antd';
import React, { FC } from 'react';
import { WorkflowDeploy, WorkflowSave } from '../../../../../components';
import { useProcessPageSelector } from '../process-page-processor';
import { VersionList } from './version-list';

export interface IProcessOperationProps {}

export const ProcessOperation: FC<IProcessOperationProps> = (props) => {
  const { resourceId, aId } = useParams();
  const [workflowAppInstance, selectVersion] = useProcessPageSelector((s) => [
    s.workflowAppInstance,
    s.selectVersion,
  ]);

  console.log('q=>workflowAppInstance-1', workflowAppInstance);
  return (
    <Space>
      <VersionList />
      {selectVersion?.id && (
        <>
          <WorkflowSave modeId={selectVersion.id} workflowAppInstance={workflowAppInstance!} />
          <WorkflowDeploy modeId={selectVersion.id} />
        </>
      )}
    </Space>
  );
};
