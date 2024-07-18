import { ITableEntity } from '@brick/types';
import { useCreation } from 'ahooks';

export interface IUseFieldsOptions {
  /**
   * 根据id排除的数据
   */
  excludeIds?: Array<string>;

  /**
   * 排除系统字段
   */
  excludeSystem?: boolean;
}

/**
 * 根据talbe config获取fileds
 * @param tableConfig
 * @returns
 */
export const useFields = (tableConfig: ITableEntity, options?: IUseFieldsOptions) => {
  const { excludeIds, excludeSystem } = options || {};

  const fields = useCreation(() => {
    let newColumns = tableConfig?.columns;
    if (excludeIds) {
      newColumns = newColumns?.filter((f) => !excludeIds.includes(f?.id!));
    }

    if (excludeSystem) {
      newColumns = newColumns?.filter((f) => !f.system);
    }
    return newColumns || [];
  }, [tableConfig, excludeIds]);

  return fields;
};
