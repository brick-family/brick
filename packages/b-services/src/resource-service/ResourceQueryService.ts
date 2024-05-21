import { IResourceEntity } from '@brick/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TUseMutationOptions } from '../types';
import {
  IQueryResourceParams,
  queryResource,
  queryResourceGroup,
  updateResource,
} from './ResourceService';

export const ResourceQueryKey = 'resource';
export const ResourceGroupQueryKey = 'resource_group';

/**
 * 获取资源
 * @param params
 * @param options
 * @returns
 */
export const useQueryResource = (
  params: IQueryResourceParams,
  options?: Parameters<typeof useQuery<IResourceEntity[]>>[2],
) => {
  const queryResult = useQuery<IResourceEntity[]>(
    [ResourceQueryKey, params],
    async ({ queryKey }) => {
      const res = await queryResource(params);
      return res;
    },
    options,
  );
  return queryResult;
};

/**
 * 获取资源分组
 * @param params
 * @returns
 */
export const useQueryResourceGroup = (params: IQueryResourceParams) => {
  const queryResult = useQuery(
    [ResourceGroupQueryKey, params],
    async ({ queryKey }) => {
      const res = await queryResourceGroup(params);
      return res;
    },
  );
  return { queryResult };
};

/**
 *修改资源
 * @param params
 * @param context
 * @returns
 */
export const useUpdateResource = (options?: TUseMutationOptions) => {
  return useMutation((resource: IResourceEntity) => {
    return updateResource(resource);
  }, options);
};
