import { useItemDetailSelector } from '../../../processor';
import { message } from 'antd';
import { useMemoizedFn } from 'ahooks';

export const useSaveData = () => {
  const [submitLoading, saveData, close] = useItemDetailSelector((s) => [
    s.submitLoading,
    s.saveData,
    s.close,
  ]);

  const save = useMemoizedFn(async () => {
    await saveData({ isRefreshTableList: true });
    message.success('创建成功！');
  });

  return {
    submitLoading,
    save,
  };
};
