import React, { FC } from 'react';
import { Select, Tag } from 'antd';
import { EFieldType } from '@brick/types';
import { IBaseFieldProps } from '../types';
import { getColor } from '@brick/component';
import { SelectProps } from 'antd/es/select';

export interface IBaseFieldSelectProps extends IBaseFieldProps<EFieldType.SELECT> {
  selectProps?: SelectProps;
}

export const BaseFieldSelect: FC<IBaseFieldSelectProps> = (props) => {
  const { columnConfig, style, className, value, onChange, selectProps } = props;

  return (
    <Select
      {...selectProps}
      style={{ ...style, width: '100%' }}
      className={className}
      // showSearch
      value={value}
      onChange={onChange}
      placeholder={columnConfig?.placeholder || ''}
      optionFilterProp="children"
      filterOption={(input, option) =>
        ((option?.label ?? '') as string).toLowerCase().includes(input.toLowerCase())
      }
    >
      {columnConfig?.options?.map((item) => {
        return (
          <Select.Option key={item.value} value={item.value}>
            {columnConfig.hasColor ? (
              <Tag color={getColor(item.color!)}>{item.label}</Tag>
            ) : (
              item.label
            )}
          </Select.Option>
        );
      })}
    </Select>
  );
};
