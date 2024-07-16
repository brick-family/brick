import { EFieldType, IColumnEntity } from './ColumnEntity';

export enum EFieldStatus {
  normal = 1,
  disable = 2,
  readonly = 3,
}

/**
 * 单行文本
 */
export interface IColumnStringConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /** 格式 1.默认 2.手机号 3.邮箱 4.身份证号码 5.密码 */
  format: number;

  /**
   * 默认值类型
   */
  defaultValueType: string;

  /**
   * 默认值
   */
  defaultValue: string;
}

/**
 * 多行文本
 */
export interface IColumnTextConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 默认值类型
   */
  defaultValueType: string;

  /**
   * 默认值
   */
  defaultValue: string;
}

export interface IColumnRichConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 默认值
   */
  defaultValue: string;
}

/**
 * 数值列的格式化方式
 */
export enum EColumnDecimalFormat {
  /**
   * 数值
   */
  number = 1,
  /**
   * 百分比
   */
  percent = 2,
}

/**
 * 数值
 */
export interface IColumnDecimalConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /** 格式 1. 数值，2 百分比 */
  format: number;

  /**
   * 小数位
   */
  decimalPlace: number;

  /**
   * 是否显示千分为 1 显示千分位 0不显示
   */
  thousands: number;

  /**
   * 默认值类型
   */
  defaultValueType: string;

  /**
   * 默认值
   */
  defaultValue: string;
}

/**
 * 日期
 */
export interface IColumnDateConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 格式化类型 1. YY-MM 2. YYYY-MM-DD 3. YYYY-MM-DD HH:MM 4. YYYY-MM-DD HH:MM:SS
   */
  format: number;
  /**
   * 默认值类型
   */
  defaultValueType: string;

  /**
   * 默认值
   */
  defaultValue: string;
}

/**
 * 列上传格式
 */
export enum EColumnUploadType {
  /**
   * 点击上传
   */
  click = 1,
  /**
   * 拖拽上传
   */
  drag = 2,
  /**
   * 卡片上传
   */
  card = 3,
}

export enum EColumnSelectType {
  /**
   * 当选
   */
  single = 1,
  /**
   * 多选
   */
  multiple = 2,
}

/**
 * 图片column config
 */
export interface IColumnImageConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;
  /**
   * 上传类型 1. 点击 2. 拖拽 3. 卡片
   */
  uploadType: number;

  /**
   * 选择类型 1 单选 2 多选
   */
  selectType: number;

  /**
   * 上传按钮文字
   */
  uploadText: string;

  /**
   * 最大上传数量
   */
  maxCount: number;

  /**
   * 最大上传大小(MB 为单位)
   */
  maxSize: number;
}

/**
 * 文件column config
 */
export interface IColumnFileConfig extends IColumnImageConfig {
  /**
   * 上传文件类型，多个类型用逗号隔开
   */
  uploadFileType: string;
}

/**
 * 列属性通用现象
 */
export interface IColumnCommonOptions {
  label: string;
  value: string;
  color?: string;
}

/**
 * 单选按钮选项类型
 */
export enum EColumnRadioSelectType {
  'single' = 1,
  'multiple' = 2,
}

/**
 * 单选按钮方向枚举
 */
export enum EColumnRadioDirection {
  'horizontal' = 1,
  'vertical' = 2,
}

// 单选按钮和复选按钮组
export interface IColumnRadioConfig {
  /**
   * 描述
   */
  description: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 是否显示颜色
   */
  hasColor: boolean;

  /**
   * 选项内容 [{ name: '选项一'，value: '1', color: 'red'}]
   */
  options: Array<IColumnCommonOptions>;

  /**
   * 选项类型 1 单选 2 多选
   */
  selectType: number;

  /**
   * 排列方向 1 横向 2 纵向
   */
  direction: number;

  /**
   * 默认值
   */
  defaultValue: Array<string>;
}

/**
 * 关联数据
 */
export interface IColumnRelationConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 关联表ID
   */
  relationTableId: string;

  /**
   * 主标题id
   */
  labelFieldId: string;

  /**
   * 要显示的字段
   */
  displayFieldIds: Array<string>;

  /**
   * 显示的字段全值
   */
  displayFields: Array<IColumnEntity>;

  /**
   * 选择类型 1 单选 2 多选
   */
  selectType: number;

  /**
   * 0 不可新增 1 可新增
   */
  allowAdd: number;

  /**
   * 数据筛选（使用统一的筛选组件，json配置）
   */
  filter: any;

  /**
   * 数据排序 数据排序(使用统一的筛选组件，json配置)
   */
  sort: any;
}

/**
 * 列字表config
 */
export interface IColumnSubTableConfig {
  /**
   * 无数据时提示内容
   */
  emptyTip: string;

  /**
   * 关联的字表Id
   */
  subTableId: string;

  /**
   * 要显示的字段
   */
  displayFields: Array<Record<string, any>>;
}

/**
 * 用户config
 */
export interface IColumnUserConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 默认值类型
   */
  defaultValueType: string;

  /**
   * 默认值
   */
  defaultValue: string | string[] | undefined;
  /**
   * 选择类型 1 单选 2 多选
   */
  selectType: number;
}

/**
 * 列选择config
 */
export interface IColumnSelectConfig {
  /**
   * 描述
   */
  description: string;
  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 1. 普通 2禁用 3 只读
   */
  status: number;

  /**
   * 是否显示颜色
   */
  hasColor: boolean;

  /**
   * 选项内容 [{ name: '选项一'，value: '1', color: 'red'}]
   */
  options: Array<IColumnCommonOptions>;

  /**
   * 选项类型 1 单选 2 多选
   */
  selectType: number;

  /**
   * 默认值
   */
  defaultValue: Array<string>;
}

export type TColumnConfigMap = {
  //单行文本
  [EFieldType.STRING]: IColumnStringConfig;
  //多行文本
  [EFieldType.TEXT]: IColumnTextConfig;
  // 富文本
  [EFieldType.RICH]: IColumnRichConfig;
  //数字
  [EFieldType.DECIMAL]: IColumnDecimalConfig;
  // 日期
  [EFieldType.DATE]: IColumnDateConfig;
  // 单选按钮组和复选按钮组
  [EFieldType.RADIO]: IColumnRadioConfig;
  //图片
  [EFieldType.IMAGE]: IColumnImageConfig;
  //文件
  [EFieldType.FILE]: IColumnFileConfig;
  // 关联数据
  [EFieldType.RELATION]: IColumnRelationConfig;
  // 字表
  [EFieldType.SUBTABLE]: IColumnSubTableConfig;
  // 下拉选择
  [EFieldType.SELECT]: IColumnSelectConfig;
  // 用户选择
  [EFieldType.USER]: IColumnUserConfig;
};
