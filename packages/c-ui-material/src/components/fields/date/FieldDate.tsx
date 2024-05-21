import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import { DatePicker, DatePickerProps } from 'antd';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';
import { DateFormatConstant } from '@brick/utils';
import dayjs from 'dayjs';

export interface IFieldDateProps extends BaseWrapperProps<EFieldType.DATE> {}

export const FieldDate: FC<IFieldDateProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  const format = columnConfig?.format;

  const currFormat = DateFormatConstant.find((f) => f.value == format);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    const currUnix = date?.valueOf();
    onChange?.(currUnix);
  };
  return (
    <BaseWrapper {...props}>
      <DatePicker
        style={{ width: '100%' }}
        disabled={readonly || columnConfig?.status === EFieldStatus.disable}
        placeholder={columnConfig?.placeholder}
        showTime={currFormat?.showTime}
        format={currFormat?.label || 'YYYY-MM-DD'}
        value={value ? dayjs(value) : undefined}
        onChange={onDateChange}
      />
    </BaseWrapper>
  );
};
