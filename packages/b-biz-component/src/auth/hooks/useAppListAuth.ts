import { TAppOperatorCode } from '@brick/types';
import { useGlobalSelector } from '@brick/processor';
import { useCreation } from 'ahooks';

/**
 * 只用来处理主页列表页的权限
 * @param appOperatorCode
 */
export const useAppListAuth = (appOperatorCode?: TAppOperatorCode) => {
  const [isAdmin, appPerm] = useGlobalSelector((s) => [s.isAdmin, s.userInfo.appPerm]);

  console.log('q=>isAdmin', isAdmin, appPerm);
  return useCreation(() => {
    return isAdmin || Object.values(appPerm || {}).filter((f) => f.rights?.length > 0).length > 0;
  }, [appPerm]);
};
