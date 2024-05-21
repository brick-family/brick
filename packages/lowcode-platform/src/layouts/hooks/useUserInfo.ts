import { getUserInfo } from '@brick/services';
import { lpLocalStorage } from '@brick/utils';
import { useLayoutEffect, useState } from 'react';
import { history, useParams } from 'umi';

import { useGlobalSelector } from '@/global-processor';

/**
 * 检查用户是否已经登录
 */
export const useUserInfo = () => {
  const setUserInfo = useGlobalSelector((s) => s.setUserInfo);
  const [hasUserInfo, setHasUserInfo] = useState<boolean>(false);

  const { tenantId, aId } = useParams();

  const token = lpLocalStorage.get('user_token');
  const isLogin = Boolean(token);
  if (!isLogin) {
    history.push('/login');
  }

  useLayoutEffect(() => {
    isLogin &&
      getUserInfo(aId!).then((res) => {
        console.log('q=>params--set');
        setHasUserInfo(true);
        // 设置用户信息
        setUserInfo(res, {
          tenantId,
          appId: aId,
        });
      });
  }, []);

  return {
    isLogin,
    hasUserInfo,
  };
};
