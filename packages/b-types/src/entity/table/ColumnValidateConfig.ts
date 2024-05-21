/**
 * 数字范围区间value
 */
export interface INumberRangeValue {
  min?: number;
  max?: number;
}

/**
 * 字段验证的通用config
 */
export interface IColumnValidateConfig {
  /***********验证字段*********** */
  // 是否必填
  isRequired?: boolean;
  // 是否重复
  isRepeat?: boolean;

  // 数字反问
  numberRange?: INumberRangeValue;

  /***********验证字段*********** */
}
