import { message as AntMessage } from 'antd';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ELocationStorageKey } from '@brick/types';
import lpLocalStorage from './localStorage';
import { goLogin, goNoAuth } from './userUtil';
import { getAppId, getTenantId } from './util';

export const getRequestHeader = () => {
  const headers: Record<string, any> = {};
  const appId = getAppId(); // lpLocalStorage.get(ELocationStorageKey.appId);

  console.log('q=>appId-1', appId);
  // 处理app
  if (appId) {
    headers['applicationId'] = getAppId();
  }

  // 处理token
  const token = lpLocalStorage.get(ELocationStorageKey.token);
  if (token) {
    headers['token'] = token;
  }

  // 处理tenant
  const tenantId = getTenantId(); // lpLocalStorage.get(ELocationStorageKey.tenantId);
  if (tenantId) {
    headers['tenantId'] = tenantId;
  }

  return headers;
};

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 0,
  headers: {},
});

service.interceptors.request.use(
  (config) => {
    const requestHeaders = getRequestHeader();

    if (requestHeaders) {
      Object.keys(requestHeaders).forEach((key) => {
        config.headers[key] = requestHeaders[key];
      });
    }
    return config;
  },
  () => {}
);

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data;
    if (code === '0000' || code === '200') {
      return data;
    }

    // 用户未登录
    if (code === '208') {
      goLogin(true);
      return Promise.reject(message); // TODO 这里可以不用拦截，直接出提示
    }
    const errorMessage = message || '服务端出错了！';
    console.error(`SERVER_ERROR:${errorMessage}`);
    AntMessage.error(errorMessage);
    return Promise.reject(message);
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录';
        goLogin(true);
        return;
      // 这里可以触发退出的 action
      case 403:
        message = '拒绝访问';
        // 去未授权路由
        goNoAuth();
        return;
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }
    AntMessage.error(message);
    return Promise.reject(error);
  }
);

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  upload<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const newConfig = { ...config, headers };
    return service.post(url, data, newConfig);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

export { http as Request };
