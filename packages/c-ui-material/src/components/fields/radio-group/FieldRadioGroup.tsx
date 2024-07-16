import React, { FC, useMemo } from 'react';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EFieldStatus, EFieldType } from '@brick/types';
import { generatorClass, useFormContainerSelector } from '@/components';
import './radioGroup.less';
import classNames from 'classnames';
import { BaseFieldRadio } from '@brick/biz-component';

export interface IFieldRadioGroupProps extends BaseWrapperProps<EFieldType.RADIO> {}

export const FieldRadioGroup: FC<IFieldRadioGroupProps> = (props) => {
  const className = classNames(generatorClass('filed-radio-group'));
  const { columnConfig } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      <BaseFieldRadio
        className={className}
        innerProps={{
          disabled: readonly || columnConfig?.status === EFieldStatus.disable,
        }}
        {...props}
      />
    </BaseWrapper>
  );
};
