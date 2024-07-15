import React, { FC, useMemo } from 'react';
import { IBaseFieldProps } from '../types';
import { EColumnRadioDirection, EFieldType } from '@brick/types';
import { Radio, RadioGroupProps, Space, Tag } from 'antd';
import { getColor } from '@brick/component';
import { useMemoizedFn } from 'ahooks';

export interface IBaseFieldRadioProps extends IBaseFieldProps<EFieldType.RADIO> {
  innerProps?: RadioGroupProps;
}
export const BaseFieldRadio: FC<IBaseFieldRadioProps> = (props) => {
  const { columnConfig, style, className, value, onChange, innerProps } = props;

  const onGroupChange = useMemoizedFn((e: any) => {
    onChange?.([e.target.value]);
  });

  const direction =
    columnConfig.direction == EColumnRadioDirection.horizontal ? 'horizontal' : 'vertical';

  console.log('q=>field-radio', props, value?.join?.('') || columnConfig?.defaultValue?.join?.(''));

  const newValue = useMemo(() => {
    if (Array.isArray(value)) {
      return value?.join('');
    }
    return value || columnConfig?.defaultValue;
  }, [value]);

  return (
    <Radio.Group
      style={style}
      className={className}
      {...innerProps}
      onChange={onGroupChange!}
      value={value}
    >
      <Space direction={direction} wrap>
        {columnConfig?.options?.map((item) => (
          <Radio value={item.value} key={item.value}>
            {columnConfig.hasColor ? (
              <Tag color={getColor(item.color!)}>{item.label}</Tag>
            ) : (
              item.label
            )}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
