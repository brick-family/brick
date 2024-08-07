import { useRequest } from 'ahooks';
import { getResource } from '@brick/services';
import { useEffect } from 'react';

const RESOURCE_CACHE_KEY = 'RESOURCE-CACHE-';

/**
 * 获取资源信息
 * @param id
 */
export const useResourceDataCache = (id: string) => {
  const response = useRequest(() => getResource(id), {
    cacheKey: `${RESOURCE_CACHE_KEY}-${id}`,
    manual: true,
  });

  useEffect(() => {
    if (id) {
      response?.run();
    }
  }, [id]);

  return response;
};
