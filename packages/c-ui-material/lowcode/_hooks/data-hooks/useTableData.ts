import { clearCache, useRequest } from 'ahooks';
import { getTable } from '@brick/services';
import { useEffect } from 'react';

/**
 * 获取表格数据
 * @param tableId
 */
export const useTableData = (tableId: string) => {
  const cacheKey = `setter-table-${tableId}`;
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
