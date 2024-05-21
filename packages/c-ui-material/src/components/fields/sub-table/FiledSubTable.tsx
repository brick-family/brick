import * as React from 'react';
import { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base';
import { useFormContainerSelector } from '../../form-container';
import { EFieldType } from '@brick/types';
import { DataTable } from '@brick/biz-component';

export interface IFieldSubTableProps extends BaseWrapperProps<EFieldType.SUBTABLE> {}

export const FieldSubTable: FC<IFieldSubTableProps> = (props) => {
  const { value, onChange, columnConfig, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      {columnConfig.subTableId && <DataTable tableId={columnConfig.subTableId} />}
    </BaseWrapper>
  );
};
