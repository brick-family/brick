import { Select } from 'antd';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';
import { useValueSelector, VersatileSelectorProps } from 'react-querybuilder';
import { toOptions } from './utils';

export type AntDValueSelectorProps = VersatileSelectorProps &
  Omit<ComponentPropsWithoutRef<typeof Select>, 'onChange' | 'defaultValue'>;

export const AntDValueSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
  disabled,
  multiple,
  listsAsArrays,
  // Props that should not be in extraProps
  testID: _testID,
  rule: _rule,
  rules: _rules,
  level: _level,
  path: _path,
  context: _context,
  validation: _validation,
  operator: _operator,
  field: _field,
  fieldData: _fieldData,
  schema: _schema,
  ...extraProps
}: AntDValueSelectorProps) => {
  const { onChange, val } = useValueSelector({ handleOnChange, listsAsArrays, multiple, value });

  const modeObj = multiple ? { mode: 'multiple' as const } : {};

  // console.log('q=>extraProps', extraProps, val, modeObj);

  return (
    <span title={title} className={className}>
      <Select
        {...modeObj}
        popupMatchSelectWidth={false}
        disabled={disabled}
        value={val}
        onChange={onChange}
        // placeholder={'请选择字段'}
        {...extraProps}
      >
        {toOptions(options)}
      </Select>
    </span>
  );
};

AntDValueSelector.displayName = 'AntDValueSelector';
