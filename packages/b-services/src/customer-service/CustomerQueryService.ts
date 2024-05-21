import { useQuery } from '@tanstack/react-query';
import {
  CustomerQueryKey,
  get,
  IGetCustomerParams,
  IQueryCustomerParams,
  query,
} from './CustomerService';

export const useGetCustomer = (params: IGetCustomerParams) => {
  const queryResult = useQuery(
    [CustomerQueryKey, params],
    async ({ queryKey }) => {
      if (params.id) {
        return null;
      }
      return await get(params);
    },
  );

  return { queryResult };
};

/**
 * 查询Customer
 * @param params
 * @returns
 */
export const useQueryCustomer = (params: IQueryCustomerParams) => {
  const queryResult = useQuery(
    [CustomerQueryKey, params],
    async ({ queryKey }) => {
      // if (params.) {
      //   return null;
      // }
      return await query(params);
    },
  );

  return { queryResult };
};
