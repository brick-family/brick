import { useMemoizedFn } from 'ahooks';
import { useItemDetailSelector } from '../../processor';

/**
 * 重置表单
 * @returns
 */
export const useResetFields = () => {
  const [formRef] = useItemDetailSelector((s) => [s.formRef]);

  const resetFields = useMemoizedFn(() => {
    formRef?.current?.getFormInstance().then((instance) => {
      instance.resetFields?.();
    });
  });

  return {
    resetFields,
  };
};
