import { IColumnEntity, TFieldType } from '@brick/types';

/**
 * 排除指定类型的字段
 */
export const excludeFieldsByType = (
  columns: IColumnEntity[],
  excludeFieldsType: Array<TFieldType>
) => {
  return columns?.filter((f) => !excludeFieldsType.includes(f.fieldType)) || [];
};

/**
 * 排除id字段
 * @param columns
 */
export const excludeFieldsById = (columns: IColumnEntity[]) => {
  return columns?.filter((f) => f.dbFieldName !== 'id') || [];
};
