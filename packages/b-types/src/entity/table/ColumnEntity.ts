import { TColumnConfigMap } from './ColumnConfig';
import { IBaseEntity } from '../base';
import { IColumnValidateConfig } from './ColumnValidateConfig';

/**
 * 数据库字段类型枚举
 */
export enum EFieldType {
  // 单行文本
  STRING = 'STRING',
  // 多行文本
  TEXT = 'TEXT',
  // 富文本
  RICH = 'RICH',
  // 数值
  DECIMAL = 'DECIMAL',
  // 日期
  DATE = 'DATE',
  // 单选按钮组和多选按钮组
  RADIO = 'RADIO',

  // 下拉框
  SELECT = 'SELECT',
  // 图片
  IMAGE = 'IMAGE',
  // 文件
  FILE = 'FILE',
  // 关联数据
  RELATION = 'RELATION',
  // 字表
  SUBTABLE = 'SUBTABLE',

  // 用户
  USER = 'USER',
}

/**
 * 数据库字段类型
 */
export type TFieldType = keyof typeof EFieldType;

export type TColumnConfig = Record<string, any>;

/**
 * 数据库系统字段
 */
export enum EDbSystemFieldName {
  id = 'id',
  create_time = 'create_time',
  update_time = 'update_time',
}

export type TDbSystemFieldName = keyof typeof EDbSystemFieldName;

export interface IColumnEntity<T extends TFieldType = any> extends IBaseEntity {
  dbTableName?: string;
  // 列名称
  dbFieldName?: string;
  // 数据库字段类型
  fieldType: TFieldType;

  // 标题
  title?: string;

  // 扩展参数
  extraParam?: Record<string, any>;

  // 列配置信息
  columnConfig: T extends keyof TColumnConfigMap ? TColumnConfigMap[T] : TColumnConfig;

  // 校验信息
  validateConfig: IColumnValidateConfig;

  // 是否系统字段
  system?: boolean;
}
