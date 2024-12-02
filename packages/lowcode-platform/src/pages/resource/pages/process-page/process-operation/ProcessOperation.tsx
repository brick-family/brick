import { EFlowModelStatus, IFlowModelVo, IWorkflowEntity } from '@brick/types';
import { useParams, useSearchParams } from '@umijs/max';
import { Space } from 'antd';
import React, { FC, useEffect } from 'react';
import { WorkflowCreateProcess, WorkflowDeploy, WorkflowSave } from '../../../../../components';
import { useProcessPageSelector } from '../process-page-processor';
import { VersionList } from './version-list';

export interface IProcessOperationProps {}

export const ProcessOperation: FC<IProcessOperationProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workflowAppInstance, selectVersion, maxVersion, getProcessList, setSelectVersion] =
    useProcessPageSelector((s) => [
      s.workflowAppInstance,
      s.selectVersion,
      s.maxVersion,
      s.getProcessList,
      s.setSelectVersion,
    ]);
  const isDesign = selectVersion?.status === EFlowModelStatus.DESIGNING; // 设计中，可以有保存和发布流程
  const isHistory = selectVersion?.status === EFlowModelStatus.HISTORY; // 历史版本，可以有发布和创建新流程
  const isUsing = selectVersion?.status === EFlowModelStatus.USING; // 使用中，只有创建新流程

  const handleSelectVersion = (selectVersion: IFlowModelVo) => {
    if (selectVersion?.metaInfo) {
      setSearchParams({ wid: selectVersion.metaInfo });
    }
    setSelectVersion(selectVersion);
  };

  const handleCreateSuccess = (workflowEntity: IWorkflowEntity) => {
    if (workflowEntity.id) {
      setSearchParams({ wid: workflowEntity.id });
    }
  };

  const handleDeploySuccess = () => {
    // 刷新部署列表
    getProcessList();
  };

  const renderBtn = () => {
    const btnMap = {
      save: (
        <WorkflowSave
          key="save"
          modeId={selectVersion?.id!}
          workflowAppInstance={workflowAppInstance!}
        />
      ),
      deploy: (
        <WorkflowDeploy
          key="deploy"
          modeId={selectVersion?.id!}
          onDeploySuccess={handleDeploySuccess}
        />
      ),
      create: (
        <WorkflowCreateProcess
          key="create"
          modeId={selectVersion?.id!}
          createVersion={maxVersion + 1}
          workflowAppInstance={workflowAppInstance!}
          onCreateSuccess={handleCreateSuccess}
        />
      ),
    };
    if (isDesign) {
      return [btnMap.save, btnMap.deploy];
    }
    if (isHistory) {
      return [btnMap.deploy, btnMap.create];
    }
    if (isUsing) {
      return [btnMap.create];
    }
  };
  return (
    <Space>
      <VersionList onSelect={handleSelectVersion} />
      {selectVersion?.id && <>{renderBtn()}</>}
    </Space>
  );
};
