import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import classNames from 'classnames';
import './fieldInputNumber.less';
import { generatorClass } from '../../utils';
import { useDestroyRender } from '../../hooks';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';
import { BaseFieldInputNumber } from '@brick/biz-component';

export interface IFieldInputNumberProps extends BaseWrapperProps<EFieldType.DECIMAL> {}

export const FieldInputNumber: FC<IFieldInputNumberProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;

  const className = classNames(generatorClass('filed-input-number'));

  const { isExists, destroyRender } = useDestroyRender();
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      {isExists && (
        <BaseFieldInputNumber
          className={className}
          inputNumberProps={{
            disabled: readonly || columnConfig?.status === EFieldStatus.disable,
            placeholder: columnConfig?.placeholder,
          }}
          {...props}
          value={value}
          onChange={onChange}
        />
      )}
    </BaseWrapper>
  );
};
