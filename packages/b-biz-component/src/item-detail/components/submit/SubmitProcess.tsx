import { Space, Button } from 'antd';
import React, { FC, useRef } from 'react';
import { useItemDetailSelector } from '../../processor';
import { useResetFields } from '../hooks';
import { useSaveData, useSaveProcessData } from './hooks';

export interface ISubmitProcessProps {}

export const SubmitProcess: FC<ISubmitProcessProps> = (props) => {
  const [close] = useItemDetailSelector((s) => [s.close]);
  const { save, submitLoading } = useSaveData();

  const { saveProcess, submitProcessLoading } = useSaveProcessData();
  const { resetFields } = useResetFields();

  const handleSubmit = async () => {
    await save();
    close?.();
    resetFields();
  };

  // 发起流程
  const handleSubmitProcess = async () => {
    await saveProcess();
    close?.();
    resetFields();
  };

  return (
    <Space>
      <Button loading={submitLoading} onClick={handleSubmit}>
        仅保存数据
      </Button>
      <Button type="primary" loading={submitProcessLoading} onClick={handleSubmitProcess}>
        发起流程
      </Button>
    </Space>
  );
};
