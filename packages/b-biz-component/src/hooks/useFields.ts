import { ITableEntity } from '@brick/types';
import { useMemo } from 'react';
import { useCreation } from 'ahooks';

/**
 * 根据talbe config获取fileds
 * @param tableConfig
 * @returns
 */
export const useFields = (tableConfig: ITableEntity) => {
  const fields = useCreation(() => {
    return tableConfig?.columns || [];
  }, [tableConfig]);

  return fields;
};
