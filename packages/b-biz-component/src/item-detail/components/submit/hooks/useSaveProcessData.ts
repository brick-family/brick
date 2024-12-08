import { useItemDetailSelector } from '../../../processor';
import { message } from 'antd';
import { useMemoizedFn } from 'ahooks';

export const useSaveProcessData = () => {
  const [submitProcessLoading, saveProcessData, close] = useItemDetailSelector((s) => [
    s.submitProcessLoading,
    s.saveProcessData,
    s.close,
  ]);

  const saveProcess = useMemoizedFn(async () => {
    await saveProcessData({ isRefreshTableList: true });
    message.success('创建成功！');
  });

  return {
    submitProcessLoading,
    saveProcess,
  };
};
