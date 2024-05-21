import { ELocationStorageKey, IUserInfoVo } from '@brick/types';
import history from './history';
import lpLocalStorage from './localStorage';
import { getTenantId } from './util';
import { globalProcessor } from '@brick/processor';

/**
 * 设置用户信息
 * @param usrLoginVo
 */
export const setUserInfo = (usrLoginVo: IUserInfoVo) => {
  const tenantId = getTenantId();
  lpLocalStorage.add('user_token', usrLoginVo.token);
  lpLocalStorage.addCoverObject('user_info', usrLoginVo);
  if (usrLoginVo?.tenantList?.length <= 0) return;

  if (tenantId) {
    const currTenant = usrLoginVo?.tenantList?.find((f) => f.id == tenantId);
    // 如果localStorage中存在tenantId, 不用这
    if (currTenant) return;
  }

  lpLocalStorage.add(ELocationStorageKey.tenantId, usrLoginVo?.tenantList?.[0]?.id);
};

/**
 * 清除用户信息
 */
export const clearUserInfo = () => {
  lpLocalStorage.remove('user_token');
  lpLocalStorage.remove('user_info');
};

export const goLogin = (isRedirectUrl?: boolean) => {
  clearUserInfo();
  const redirectUrl = encodeURIComponent(window.location.href);
  let url = '/login';

  // 是否加了重定向的url
  if (isRedirectUrl) {
    url += '?redirect_url=' + redirectUrl;
  }

  history.push(url);
};

export const goNoAuth = () => {
  globalProcessor?.showAuthPage.set(true);
};
