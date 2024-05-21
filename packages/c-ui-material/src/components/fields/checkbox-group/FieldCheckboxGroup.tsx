import React, { FC } from 'react';
import { Checkbox, Space, Tag } from 'antd';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EColumnRadioDirection, EFieldStatus, EFieldType } from '@brick/types';
import { generatorClass, useFormContainerSelector } from '@/components';
import './checkboxGroup.less';
import classNames from 'classnames';
import { getColor } from '@brick/component';

export interface IFieldCheckGroupProps extends BaseWrapperProps<EFieldType.RADIO> {}

export const FieldCheckboxGroup: FC<IFieldCheckGroupProps> = (props) => {
  const className = classNames(generatorClass('filed-checkbox-group'));
  const { columnConfig, value, onChange } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);
  const direction =
    columnConfig.direction == EColumnRadioDirection.horizontal ? 'horizontal' : 'vertical';

  const onGroupChange = (value: Array<string>) => {
    onChange?.(value);
  };

  return (
    <BaseWrapper {...props}>
      <Checkbox.Group
        className={className}
        disabled={readonly || columnConfig?.status === EFieldStatus.disable}
        value={value || columnConfig?.defaultValue}
        onChange={onGroupChange}
      >
        <Space direction={direction}>
          {columnConfig?.options?.map((item) => (
            <Checkbox value={item.value} key={item.value}>
              {columnConfig.hasColor ? (
                <Tag color={getColor(item.color!)}>{item.label}</Tag>
              ) : (
                item.label
              )}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </BaseWrapper>
  );
};
