import { EFieldType, EResourceType } from '@brick/types';

export enum ELowcodeType {
  TABLE = EResourceType.TABLE,
  GROUP = EResourceType.GROUP,
}

export type TSchema = Record<string, any>[];

export type LowcodeType = keyof typeof ELowcodeType;

/**
 * 低代码编辑器
 */
export interface ILowcodeEditor {
  // 表id
  tId?: string;

  // 页面id
  pId?: string;
}

export enum EFiledComponentType {
  FieldTextarea = 'FieldTextarea',
  FieldInput = 'FieldInput',
  FieldDate = 'FIeldDate',
  FieldInputNumber = 'FieldInputNumber',
  FieldRich = 'FieldRich',
}

/**
 * 通过数据库类型获取组件类型
 */
export enum EComponentTypeByFieldType {
  'DATE' = EFiledComponentType.FieldDate,
  'STRING' = EFiledComponentType.FieldInput,
  'TEXT' = EFiledComponentType.FieldTextarea,
  'DECIMAL' = EFiledComponentType.FieldInputNumber,
  'RICH' = EFiledComponentType.FieldRich,
}

/**
 * 通过组件类型获取数据库类型
 */
export enum EFieldTypeByComponentType {
  'FieldDate' = EFieldType.DATE,
  'FieldInput' = EFieldType.STRING,
  'FieldTextarea' = EFieldType.TEXT,
  'FieldInputNumber' = EFieldType.DECIMAL,
  'FieldRich' = EFieldType.RICH,
  'FieldRadioGroup' = EFieldType.RADIO,
  'FieldCheckboxGroup' = EFieldType.RADIO,
  'FieldFile' = EFieldType.FILE,
  'FieldImage' = EFieldType.IMAGE,
  'FieldRelation' = EFieldType.RELATION,
  'FieldSubTable' = EFieldType.SUBTABLE,
  'FieldSelect' = EFieldType.SELECT,
  'FieldSelectGroup' = EFieldType.SELECT,
  'FieldUserSelect' = EFieldType.USER,
}

export type TFieldTypeByComponentType = keyof typeof EFieldTypeByComponentType;
