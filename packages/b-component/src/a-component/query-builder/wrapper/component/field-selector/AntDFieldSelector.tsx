import React, { FC } from 'react';
import { Select } from 'antd';
import { toOptions } from '../../utils';
import { FieldSelectorProps } from 'react-querybuilder';
import { useCreation } from 'ahooks';

export interface IAntDFieldSelectorProps extends FieldSelectorProps {}

export const AntDFieldSelector: FC<IAntDFieldSelectorProps> = ({
  options,
  handleOnChange,
  disabled,
  value,
  schema,
  ...otherProps
}) => {
  console.log('q=>AntDFieldSelector', otherProps, disabled, options);

  const val = useCreation(() => {
    return value === '' ? undefined : value;
  }, [value]);

  // getQuery();

  const currRules = schema?.getQuery()?.rules;

  // console.log('q=>currRules', currRules);

  const currOptions = useCreation(() => {
    if (!currRules || currRules?.length <= 0) {
      return options;
    }

    return (
      options?.map((item) => {
        return {
          ...item,
          // disabled: currRules,
        };
      }) || options
    );
  }, [options, currRules]);

  return (
    <span>
      <Select
        style={{ width: 180 }}
        {...otherProps}
        disabled={disabled}
        value={val}
        onChange={handleOnChange}
        placeholder={'选择字段'}
      >
        {toOptions(currOptions)}
      </Select>
    </span>
  );
};
