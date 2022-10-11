import * as React from 'react';
import { createElement } from 'react';
import classNames from 'classnames';
import { generatorClass } from '../../utils';
import { BaseField, BaseFieldStatus } from './types';
import './base.scss';

export interface BaseWrapperProps extends BaseField {
  /**
   * 标题
   */
  title: string;
  /**
   * 是否必填
   */
  isRequired: boolean;
  /**
   * 描述
   */
  description?: string;
}

export const BaseWrapper: React.FC<BaseWrapperProps> = function BaseWrapper({
  title,
  isRequired,
  description,
  children,
  status,
  ...otherProps
}) {

  const rootClassNames = classNames(generatorClass('field-base'));

  return (
    <div className={rootClassNames}>
      <div className={generatorClass('field-base-title')}>
        {title}
      </div>
      <div className={generatorClass('field-base-content')}>
        {status === BaseFieldStatus.readonly ? <div>--</div> : children}
      </div>
      <div className={generatorClass('field-base-desc')}>
        {description}
      </div>
    </div>
  );
};
