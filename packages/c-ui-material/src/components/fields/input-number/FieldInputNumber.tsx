import React, { FC, Suspense } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import classNames from 'classnames';
import './fieldInputNumber.less';
import { generatorClass } from '../../utils';
import { useDestroyRender } from '../../hooks';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';
import { BaseFieldInputNumber, BaseFieldInputNumberLazy } from '@brick/biz-component';
// import { BaseFieldInputNumberLazy } from '@brick/biz-component/dist/base-fields/base-field-input-number/asyncLoad';

export interface IFieldInputNumberProps extends BaseWrapperProps<EFieldType.DECIMAL> {}

export const FieldInputNumber: FC<IFieldInputNumberProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;

  const className = classNames(generatorClass('filed-input-number'));

  const { isExists, destroyRender } = useDestroyRender();
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  console.log('q=>BaseFieldInputNumberLazy', BaseFieldInputNumberLazy);
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
