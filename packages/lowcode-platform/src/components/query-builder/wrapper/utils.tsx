import * as React from 'react';
import type { OptionList } from 'react-querybuilder';
import { isOptionGroupArray } from 'react-querybuilder';
import { Select } from 'antd';

const { OptGroup, Option } = Select;

export { isOptionGroupArray };

export const toOptions = (arr?: OptionList) =>
  isOptionGroupArray(arr)
    ? arr.map((og) => (
        <OptGroup key={og.label} label={og.label}>
          {og.options.map((opt) => (
            <Option key={opt.name} value={opt.name}>
              {opt.label}
            </Option>
          ))}
        </OptGroup>
      ))
    : Array.isArray(arr)
    ? arr.map((opt: any) => (
        <Option key={opt.name} value={opt.name}>
          {opt.label}
        </Option>
      ))
    : /* istanbul ignore next */ null;

/**
 * 条件选择器
 */
export const combinators = [
  { name: 'and', label: '且' },
  { name: 'or', label: '或' },
];

/**
 * 操作符
 */
export const operators = [
  { label: '等于', name: '=' },
  { label: '不等于', name: '!=' },
  { label: '小于', name: '<' },
  { label: '大于', name: '>' },
  { label: '小于等于', name: '<=' },
  { label: '大于等于', name: '>=' },
  { label: '包含', name: 'contains' },
  { label: '不包含', name: 'does not contain' },
  { label: '为空', name: 'is null' },
  { label: '不为空', name: 'is not null' },
  { label: '在范围中', name: 'between' },
  { label: '不在范围中', name: 'not between' },
];
