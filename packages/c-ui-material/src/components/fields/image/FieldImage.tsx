import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EFieldStatus, EFieldType } from '@brick/types';
import { generatorClass, useFormContainerSelector } from '@/components';
import classNames from 'classnames';
import './image.less';
import { BaseFieldImage } from '@brick/biz-component';

export interface IFieldImageProps extends BaseWrapperProps<EFieldType.IMAGE> {}

export const FieldImage: FC<IFieldImageProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;
  const className = classNames(generatorClass('filed-image'));
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  const disabled = readonly || columnConfig?.status === EFieldStatus.disable;

  return (
    <BaseWrapper {...props}>
      <BaseFieldImage className={className} uploadProps={{ disabled }} {...props} />
    </BaseWrapper>
  );
};
