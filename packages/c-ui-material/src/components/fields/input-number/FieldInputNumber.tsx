import React, { FC, useMemo } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import { InputNumber } from 'antd';
import classNames from 'classnames';
import './fieldInputNumber.less';
import { generatorClass } from '../../utils';
import { useDestroyRender } from '../../hooks';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';

enum EInputNumberFormat {
  'Number' = 1,
  'Percent' = 2,
}

export interface IFieldInputNumberProps extends BaseWrapperProps<EFieldType.DECIMAL> {}

export const FieldInputNumber: FC<IFieldInputNumberProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;

  const className = classNames(generatorClass('filed-input-number'));

  const { isExists, destroyRender } = useDestroyRender();
  // console.log('q=>props-input-number', props);
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  console.log('q=>input-number', props);

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

  // useUpdateEffect(() => {
  //   const currIsDesign = isDesign(props);
  //   if (currIsDesign) {
  //     destroyRender();
  //   }
  // }, [props.format]);

  // const value = otherProps.value || defaultValue?.value;

  return (
    <BaseWrapper {...props}>
      {isExists && (
        <InputNumber
          className={className}
          disabled={readonly || columnConfig?.status === EFieldStatus.disable}
          placeholder={columnConfig?.placeholder}
          value={value}
          onChange={onChange}
          {...percentProps}
        />
      )}
    </BaseWrapper>
  );
};
