import React, { FC } from 'react';
import { IBaseFieldProps } from '../types';
import { EFieldType } from '@brick/types';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { DateFormatConstant } from '@brick/utils';

export interface IBaseFieldDateProps extends IBaseFieldProps<EFieldType.DATE> {
  dateProps?: DatePickerProps;
}

export const BaseFieldDate: FC<IBaseFieldDateProps> = (props) => {
  const { columnConfig, style, className, value, onChange, dateProps } = props;

  const format = columnConfig?.format;

  const currFormat = DateFormatConstant.find((f) => f.value == format);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    const currUnix = date?.valueOf();
    onChange?.(currUnix);
  };

  return (
    <DatePicker
      className={className}
      style={{ width: '100%', ...style }}
      {...dateProps}
      placeholder={columnConfig?.placeholder}
      showTime={currFormat?.showTime}
      format={currFormat?.label || 'YYYY-MM-DD'}
      value={value ? dayjs(value) : undefined}
      onChange={onDateChange}
    />
  );
};
