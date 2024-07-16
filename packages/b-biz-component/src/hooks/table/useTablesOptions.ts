import { useRequest } from 'ahooks';
import { queryResourceByResourceType } from '@brick/services';
import { useMemo } from 'react';
import { EResourceType } from '@brick/types';

export interface IUseTableOptionsParams {
  manual: boolean;
}

export interface IUseTablesParams {
  containAllData?: boolean;
  appId?: string;
}

/**
 * 获取tables选项
 */
export const useTablesOptions = (
  params?: IUseTablesParams,
  optionsParams?: IUseTableOptionsParams
) => {
  const { containAllData, appId } = params || {};
  const { manual = false } = optionsParams || {};

  const { loading, run, data } = useRequest(
    (currParams?: IUseTablesParams) => {
      const currAppId = currParams?.appId || appId;

      return queryResourceByResourceType({ resourceType: EResourceType.TABLE, appId: currAppId });
    },
    {
      manual,
    }
  );

  const options = useMemo(() => {
    let result = [];
    if (containAllData) {
      result.push({
        label: '全部表单',
        value: '',
      });
    }
    data?.forEach((item) => {
      result.push({
        label: item.title,
        value: item.id,
      });
    });

    return result;
  }, [data]);

  return { options, queryOptions: run, loading };
};
