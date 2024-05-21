import { useRequest } from 'ahooks';
import { queryResourceByResourceType } from '@brick/services';
import { useMemo } from 'react';
import { EResourceType } from '@brick/types';

/**
 * 获取tables选项
 */
export const useTablesOptions = () => {
  const { data } = useRequest(() => queryResourceByResourceType(EResourceType.TABLE));

  const options = useMemo(() => {
    return (
      data?.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      }) || []
    );
  }, [data]);

  return { options };
};
