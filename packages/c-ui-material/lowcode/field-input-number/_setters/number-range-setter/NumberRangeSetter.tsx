import React, { FC, useEffect, useState } from 'react';
import { InputNumber, Space } from 'antd';
import { SetterHoc } from '../../../common';
import { INumberRangeValue } from '@brick/types';
import { useNumberSetterDisabled } from '../hooks';

export interface INumberRangeSetterProps {
  value: INumberRangeValue;
  onChange: (value: INumberRangeValue) => void;
}

const NumberRangeSetterFun: FC<INumberRangeSetterProps> = ({ value, onChange, ...otherProps }) => {
  const [minValue, setMinValue] = useState(value?.min);
  const [maxValue, setMaxValue] = useState(value?.max);

  const { isDisabled } = useNumberSetterDisabled(otherProps);

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue]);

  const handleMinValueChange = (value: any) => {
    setMinValue(value);
  };

  const handleMaxValueChange = (value: any) => {
    setMaxValue(value);
  };

  const handleMinValueBlur = () => {
    if (maxValue !== undefined && (minValue === undefined || minValue > maxValue)) {
      setMinValue(maxValue);
    }
  };

  const handleMaxValueBlur = () => {
    if (minValue !== undefined && (maxValue === undefined || maxValue < minValue)) {
      setMaxValue(minValue);
    }
  };

  return (
    <Space>
      <InputNumber
        placeholder="不限"
        value={minValue}
        size={'small'}
        disabled={isDisabled}
        onChange={handleMinValueChange}
        onBlur={handleMinValueBlur}
      />
      <span>~</span>
      <InputNumber
        placeholder="不限"
        size={'small'}
        disabled={isDisabled}
        value={maxValue}
        onChange={handleMaxValueChange}
        onBlur={handleMaxValueBlur}
      />
    </Space>
  );
};

export const NumberRangeSetter = SetterHoc(NumberRangeSetterFun);
