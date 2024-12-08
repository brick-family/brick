import React, { FC, useRef } from 'react';
import { Button, Checkbox, message, Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useItemDetailSelector } from '../..';
import { useSaveData } from './hooks';
import { useResetFields } from '../hooks';

export interface ISubmitTableProps {}

export const SubmitTable: FC<ISubmitTableProps> = (props) => {
  const submitWay = useRef<'submit' | 'submitNext'>();
  const isSaveContent = useRef(false);

  const [close] = useItemDetailSelector((s) => [s.close]);

  const { save, submitLoading } = useSaveData();
  const { resetFields } = useResetFields();

  const handleSubmitNext = async () => {
    submitWay.current = 'submitNext';
    await save();
    // 不保留当前内容
    if (!isSaveContent.current) {
      resetFields();
    }
  };

  const handleSubmit = async () => {
    submitWay.current = 'submit';
    await save();
    close?.();
    resetFields();
  };

  return (
    <Space>
      <Checkbox onChange={(e) => (isSaveContent.current = e.target.checked)}>
        保留本此提交内容
      </Checkbox>
      <Button
        onClick={handleSubmitNext}
        loading={submitLoading && submitWay.current === 'submitNext'}
      >
        提交并继续
      </Button>
      <Button
        type="primary"
        loading={submitLoading && submitWay.current === 'submit'}
        onClick={handleSubmit}
      >
        提交
      </Button>
    </Space>
  );
};
