import { IResourceEntity, ResourceType } from '@brick/types';
import { getAppId } from '@brick/utils';

export const handleGetParams = () => {};

/**
 * 获取创建的时候默认资源
 * @param resourceType
 * @returns
 */
export const getDefaultResource = (resourceType: ResourceType) => {
  const aId = getAppId();

  const defaultResourceData: IResourceEntity = {
    applicationId: aId,
    title: '未命名的表单',
    resourceType,
    // @ts-ignore
    columns: [], // TODO 这个不应该传递
  };
  return defaultResourceData;
};
