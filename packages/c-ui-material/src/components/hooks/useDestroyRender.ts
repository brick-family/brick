import { useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';

/**
 * 组件卸载后重新加载
 * @returns
 */
export const useDestroyRender = () => {
  const [isExists, setExists] = useState(true);

  const destroyRender = useMemoizedFn(() => {
    setExists(false);
  });

  useEffect(() => {
    setExists(true);
  }, [isExists]);

  return {
    destroyRender,
    isExists,
  };
};
