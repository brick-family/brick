import { useLayoutEffect } from 'react';

import { useGlobalSelector } from '@/global-processor';
import { useParams } from '@umijs/max';

/**
 * 在localStorage中设置appId
 */
export const useSetAppId = () => {
  const { aId } = useParams();
  const [setAppId] = useGlobalSelector((s) => [s.setAppId]);

  useLayoutEffect(() => {
    // 设置appId
    // if (aId) {
    //   lpLocalStorage.add(ELocationStorageKey.appId, aId);
    // } else {
    //   lpLocalStorage.remove(ELocationStorageKey.appId);
    // }
    setAppId(aId!);
  }, [aId]);
};
