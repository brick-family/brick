import { Select } from 'antd';
import * as React from 'react';
import type { OptionList } from 'react-querybuilder';
import { isOptionGroupArray } from 'react-querybuilder';
import { EFieldType } from '@brick/types';

const { OptGroup, Option } = Select;

export { isOptionGroupArray };

export const toOptions = (arr?: OptionList) =>
  isOptionGroupArray(arr)
    ? arr.map((og) => (
        <OptGroup key={og.label} label={og.label}>
          {og.options.map((opt) => (
            <Option key={opt.name} value={opt.name} disabled={opt.disabled}>
              {opt.label}
            </Option>
          ))}
        </OptGroup>
      ))
    : Array.isArray(arr)
    ? arr.map((opt: any) => (
        <Option key={opt.name} value={opt.name} disabled={opt.disabled}>
          {opt.label}
        </Option>
      ))
    : /* istanbul ignore next */ null;

/**
 * 条件选择器
 */
export const combinators = [
  { name: 'and', label: '且' },
  // { name: 'or', label: '或' },
];

// EQUALS(" = "),
//   NOT_EQUALS(" <> "),

//   GREATER_THAN(" > "),
//   GREATER_OR_EQUALS_TO(" >= "),
//   LESS_THAN(" < "),
//   LESS_OR_EQUALS_TO(" <= "),

//   LIKE(" LIKE "),
//   NOT_LIKE(" NOT LIKE "),
//   IN(" IN "),
//   NOT_IN(" NOT IN "),
//   IS(" IS "),
//   IS_NOT(" IS NOT ");

const operatorsMap = {
  EQUALS: { label: '等于', name: ' = ' },
  NOT_EQUALS: { label: '不等于', name: ' <> ' },
  GREATER_THAN: { label: '大于', name: ' > ' },
  GREATER_OR_EQUALS_TO: { label: '大于等于', name: ' >= ' },
  LESS_THAN: { label: '小于', name: ' < ' },
  LESS_OR_EQUALS_TO: { label: '小于等于', name: ' <= ' },
  CONTAIN: { label: '包含', name: ' LIKE ' }, // TODO 还需要in  contains
  NOT_CONTAIN: { label: '不包含', name: ' NOT LIKE ' }, // does not contain
  NULL: { label: '未填写', name: ' null ' },
  NOT_NULL: { label: '已填写', name: ' not null ' },
  BETWEEN: { label: '在范围中', name: ' BETWEEN ' },
  NOT_BETWEEN: { label: '不在范围中', name: ' NOT BETWEEN ' },
};

/**
 * 操作符
 */
export const operators = Object.values(operatorsMap);

const commonOperation = [
  operatorsMap.EQUALS,
  operatorsMap.NOT_EQUALS,
  operatorsMap.CONTAIN,
  operatorsMap.NOT_CONTAIN,
  operatorsMap.NULL,
  operatorsMap.NOT_NULL,
];

/**
 * 上传
 */
const commonUploadOperation = [operatorsMap.NULL, operatorsMap.NOT_NULL];

export const FieldOperations: Record<string, Array<any>> = {
  [EFieldType.STRING]: commonOperation,
  [EFieldType.TEXT]: commonOperation,
  [EFieldType.RICH]: [
    operatorsMap.CONTAIN,
    operatorsMap.NOT_CONTAIN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],
  [EFieldType.DECIMAL]: [
    operatorsMap.EQUALS,
    operatorsMap.NOT_EQUALS,
    operatorsMap.GREATER_THAN,
    operatorsMap.GREATER_OR_EQUALS_TO,
    operatorsMap.LESS_THAN,
    operatorsMap.LESS_OR_EQUALS_TO,
    operatorsMap.BETWEEN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],
  [EFieldType.FILE]: commonUploadOperation,
  [EFieldType.IMAGE]: commonUploadOperation,

  [EFieldType.DATE]: [
    operatorsMap.EQUALS,
    operatorsMap.NOT_EQUALS,
    operatorsMap.GREATER_THAN,
    operatorsMap.GREATER_OR_EQUALS_TO,
    operatorsMap.LESS_THAN,
    operatorsMap.LESS_OR_EQUALS_TO,
    operatorsMap.BETWEEN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],

  [EFieldType.RADIO]: [
    operatorsMap.EQUALS,
    operatorsMap.NOT_EQUALS,
    operatorsMap.CONTAIN,
    operatorsMap.NOT_CONTAIN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],

  [EFieldType.SELECT]: [
    operatorsMap.EQUALS,
    operatorsMap.NOT_EQUALS,
    operatorsMap.CONTAIN,
    operatorsMap.NOT_CONTAIN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],

  [EFieldType.USER]: [
    operatorsMap.EQUALS,
    operatorsMap.NOT_EQUALS,
    operatorsMap.CONTAIN,
    operatorsMap.NOT_CONTAIN,
    operatorsMap.NULL,
    operatorsMap.NOT_NULL,
  ],
};

/**
 * 字段类型
 */
export const FieldInputType: Record<string, string> = {
  [EFieldType.STRING]: 'text',
  [EFieldType.TEXT]: 'text',
  [EFieldType.RICH]: 'text',
  [EFieldType.DECIMAL]: 'number',
  [EFieldType.RADIO]: 'radio',
  [EFieldType.DATE]: 'date',
};
