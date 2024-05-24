import * as React from 'react';
import classNames from 'classnames';
import { generatorClass } from '../../utils';
import './base.less';
import { EFieldStatus, EFieldType, IColumnStringConfig, IColumnValidateConfig } from '@brick/types';
import { FiledMask } from '@/components/fields/base/field-mask';
import { IBaseFieldProps } from '@brick/biz-component';
import { Form } from 'antd';

export interface BaseWrapperProps<T extends EFieldType = EFieldType>
  extends IColumnValidateConfig,
    IBaseFieldProps<T> {
  hasFormItem?: boolean;
  children?: React.ReactNode;
}

export const BaseWrapper: React.FC<BaseWrapperProps> = function BaseWrapper({
  title,
  isRequired,
  columnConfig,
  children,
  hasFormItem = true,
  ...otherProps
}) {
  const { description, status } = (columnConfig || {}) as IColumnStringConfig;
  const rootClassNames = classNames(generatorClass('field-base'));

  const engineProps = otherProps as any;

  const renderChildren = () => {
    const name = engineProps?.componentId || engineProps?.__id;

    if (!hasFormItem) {
      return children;
    }
    return (
      <Form.Item
        label=""
        name={name}
        rules={[{ required: isRequired, message: `${title}不能为空！` }]}
      >
        {children}
      </Form.Item>
    );
  };

  return (
    <div className={rootClassNames}>
      <FiledMask {...otherProps} />
      <div className={generatorClass('field-base-title')}>{title}</div>
      <div className={generatorClass('field-base-content')}>
        {status == EFieldStatus?.readonly ? <div>--</div> : renderChildren()}
      </div>
      <div className={generatorClass('field-base-desc')}>{description}</div>
    </div>
  );
};
