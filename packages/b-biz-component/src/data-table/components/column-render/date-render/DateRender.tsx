import React, { FC, useMemo } from 'react';
import { IDataRenderProps } from '../types';
import { EFieldType } from '@brick/types';
import dayjs from 'dayjs';
import { DateFormatConstant } from '@brick/utils';

export const DateRender: FC<IDataRenderProps<string, EFieldType.DATE>> = (props) => {
  const { value, column } = props;

  const format = column?.columnConfig?.format;

  const valueText = useMemo(() => {
    if (value && format) {
      const currFormat = DateFormatConstant.find((item) => item.value === format);
      return dayjs(value).format(currFormat?.label!);
    }
    return '';
  }, [format, value]);
  return <div>{valueText}</div>;
};
