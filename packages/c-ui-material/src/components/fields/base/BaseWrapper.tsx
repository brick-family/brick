import * as React from 'react';
import classNames from 'classnames';
import { generatorClass } from '../../utils';
import './base.less';
import { EFieldStatus, EFieldType, IColumnStringConfig, IColumnValidateConfig } from '@brick/types';
import { FiledMask } from '@/components/fields/base/field-mask';
import { IBaseFieldProps } from '@brick/biz-component';

export interface BaseWrapperProps<T extends EFieldType = EFieldType>
  extends IColumnValidateConfig,
    IBaseFieldProps<T> {
  children?: React.ReactNode;
}

export const BaseWrapper: React.FC<BaseWrapperProps> = function BaseWrapper({
  title,
  isRequired,
  columnConfig,
  children,
  ...otherProps
}) {
  const { description, status } = (columnConfig || {}) as IColumnStringConfig;
  const rootClassNames = classNames(generatorClass('field-base'));

  return (
    <div className={rootClassNames}>
      <FiledMask {...otherProps} />
      <div className={generatorClass('field-base-title')}>{title}</div>
      <div className={generatorClass('field-base-content')}>
        {status == EFieldStatus?.readonly ? <div>--</div> : children}
      </div>
      <div className={generatorClass('field-base-desc')}>{description}</div>
    </div>
  );
};
