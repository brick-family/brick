import { clearCache, useRequest } from 'ahooks';
import { getTable } from '@brick/services';
import { useEffect } from 'react';

export interface IUseTableDataOptions {
  namescpace?: string;
}

/**
 * 获取表格数据
 * @param tableId
 */
export const useTableData = (tableId: string, options?: IUseTableDataOptions) => {
  const { namescpace = 'brick' } = options || {};
  const cacheKey = `${namescpace}-table-${tableId}`;

  const { data, loading, run } = useRequest(getTable, {
    manual: true,
    cacheKey: cacheKey,
  });

  useEffect(() => {
    if (tableId) {
      run({ id: tableId, hasSchema: false });
    }

    return () => {
      clearCache(cacheKey);
    };
  }, [tableId]);

  return { table: data, loading };
};
