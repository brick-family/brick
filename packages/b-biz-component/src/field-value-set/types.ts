export enum EFieldValueType {
  /**
   * 具体的值
   */
  value = 'value',
  /**
   * 表达式
   */
  formula = 'formula',
}

export type TFieldValueType = keyof typeof EFieldValueType;
/**
 * 字段值
 */
export interface IFieldValue {
  fieldId: string;
  type: EFieldValueType;
  data: any;
}
