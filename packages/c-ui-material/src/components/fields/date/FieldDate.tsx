import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import { DatePicker, DatePickerProps } from 'antd';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';
import { DateFormatConstant } from '@brick/utils';
import { BaseFieldDate } from '@brick/biz-component';

export interface IFieldDateProps extends BaseWrapperProps<EFieldType.DATE> {}

export const FieldDate: FC<IFieldDateProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      <BaseFieldDate
        dateProps={{
          disabled: readonly || columnConfig?.status === EFieldStatus.disable,
        }}
        {...props}
      />
    </BaseWrapper>
  );
};
