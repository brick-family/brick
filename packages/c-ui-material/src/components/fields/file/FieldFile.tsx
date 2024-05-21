import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EFieldStatus, EFieldType } from '@brick/types';
import { generatorClass, useFormContainerSelector } from '@/components';
import classNames from 'classnames';
import { BaseFieldFile } from '@brick/biz-component';

export interface IFieldFileProps extends BaseWrapperProps<EFieldType.FILE> {}

export const FieldFile: FC<IFieldFileProps> = (props) => {
  const { columnConfig, onChange, value, ...otherProps } = props;
  const className = classNames(generatorClass('filed-file'));
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  const disabled = readonly || columnConfig?.status === EFieldStatus.disable;

  return (
    <BaseWrapper {...props}>
      <BaseFieldFile className={className} uploadProps={{ disabled }} {...props} />
    </BaseWrapper>
  );
};
