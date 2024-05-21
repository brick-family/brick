import React, { FC, useMemo } from 'react';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EColumnRadioDirection, EFieldStatus, EFieldType } from '@brick/types';
import { generatorClass, useFormContainerSelector } from '@/components';
import './radioGroup.less';
import classNames from 'classnames';
import { Radio, Space, Tag } from 'antd';
import { getColor } from '@brick/component';
import { useMemoizedFn } from 'ahooks';

export interface IFieldRadioGroupProps extends BaseWrapperProps<EFieldType.RADIO> {}

export const FieldRadioGroup: FC<IFieldRadioGroupProps> = (props) => {
  const className = classNames(generatorClass('filed-radio-group'));
  const { columnConfig, value, onChange } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

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

  console.log('q=>radio', newValue);
  return (
    <BaseWrapper {...props}>
      <Radio.Group
        disabled={readonly || columnConfig?.status === EFieldStatus.disable}
        className={className}
        onChange={onGroupChange}
        value={newValue}
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
    </BaseWrapper>
  );
};
