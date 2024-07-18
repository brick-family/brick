import React, { FC, useMemo } from 'react';
import { IBaseFieldProps } from '../types';
import { EFieldType } from '@brick/types';
import { InputNumber, InputNumberProps } from 'antd';

enum EInputNumberFormat {
  'Number' = 1,
  'Percent' = 2,
}

export interface IBaseFieldInputNumberProps extends IBaseFieldProps<EFieldType.DECIMAL> {
  inputNumberProps?: InputNumberProps;
}

export const BaseFieldInputNumber: FC<IBaseFieldInputNumberProps> = (props) => {
  const { columnConfig, style, className, value, onChange, inputNumberProps, ...otherProps } =
    props;

  // 百分比处理
  const percentProps: any = useMemo(() => {
    const isPercent = columnConfig?.format === EInputNumberFormat.Percent;

    // 是否开启千分位置
    const isThousands = columnConfig?.thousands == 1;
    // 小数位
    const decimalPlace = columnConfig?.decimalPlace || 0;
    if (isPercent) {
      return {
        formatter: (value: string) => {
          if (value === undefined || isNaN(parseFloat(value))) {
            return '';
          }
          const formattedValue = parseFloat(value).toFixed(decimalPlace);
          const decimalRegex = /\.?0*$/; // 匹配末尾都是零的小数部分
          return `${formattedValue.replace(decimalRegex, '')}%`;
        },
        parser: (value: string) => value?.replace('%', ''),
      };
    }

    // 显示千分位
    if (isThousands) {
      return {
        formatter: (value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value: string) => value!.replace(/\$\s?|(,*)/g, ''),
      };
    }

    return {};
  }, [columnConfig?.format]);

  return (
    <InputNumber
      className={className}
      style={style}
      {...otherProps}
      {...inputNumberProps}
      value={value}
      onChange={onChange}
      {...percentProps}
    />
  );
};
