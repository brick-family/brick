const getUrlParams = () => {
  const url = window.location.href;
  const regex = /\/app\/(\d+)\/(\d+)\/[^\/]+$/;
  const match = url.match(regex);

  if (match) {
    const appId = match?.[1];
    const resourceId = match?.[2];
    return { appId, resourceId };
  } else {
    console.warn('No match found.');
    return {};
  }
};

/**
 * 获取url中的appid
 */
export const getUrlAppId = () => {
  return getUrlParams()?.appId;
};

/**
 * 获取url中的资源id
 */
export const getUrlResourceId = () => {
  return getUrlParams()?.resourceId;
};
