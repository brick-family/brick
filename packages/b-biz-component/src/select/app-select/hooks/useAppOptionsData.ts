import { useRequest } from 'ahooks';
import { queryAppList } from '@brick/services';
import { useMemo } from 'react';

/**
 * 获取app options
 */
export const useAppOptionsData = () => {
  const { data } = useRequest(() => queryAppList());

  const options = useMemo(() => {
    return (
      data?.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }) || []
    );
  }, [data]);

  return { options };
};
