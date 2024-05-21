import React, { FC, useRef } from 'react';
import { Button, Checkbox, message } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useItemDetailSelector } from '../..';

export interface ISubmitProps {}

export const Submit: FC<ISubmitProps> = (props) => {
  const submitWay = useRef<'submit' | 'submitNext'>();
  const isSaveContent = useRef(false);

  const resetFields = useMemoizedFn(() => {
    formRef?.current?.getFormInstance().then((instance) => {
      instance.resetFields?.();
    });
  });

  const [submitLoading, saveData, formRef, close] = useItemDetailSelector((s) => [
    s.submitLoading,
    s.saveData,
    s.formRef,
    s.close,
  ]);

  const save = useMemoizedFn(async () => {
    await saveData({ isRefreshTableList: true });
    message.success('创建成功！');
    if (submitWay.current === 'submit') {
      close?.();
      resetFields();
      return;
    }

    if (submitWay.current === 'submitNext') {
      // 不保留当前内容
      if (!isSaveContent.current) {
        resetFields();
      }
    }
  });

  const handleSubmitNext = () => {
    submitWay.current = 'submitNext';
    save();
  };

  const handleSubmit = () => {
    submitWay.current = 'submit';
    save();
  };
  return (
    <>
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
    </>
  );
};
