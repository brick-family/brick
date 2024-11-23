import { EResourceType } from '@brick/types';

/**
 * 判断资源是否是表格类型
 * @param resourceType 资源类型
 * @returns
 */
export const isTableResourceByType = (resourceType: string) => {
  return [EResourceType.TABLE, EResourceType.PROGRESS_TABLE].includes(
    resourceType as EResourceType
  );
};
