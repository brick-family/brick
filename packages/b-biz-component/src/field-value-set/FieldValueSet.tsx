import React, { FC } from 'react';
import {
  FieldValueSetProvider,
  IFieldValueSetProviderProps,
  useFieldValueSetSelector,
} from './processor/FieldValueSetProvider';
import { FieldAdd, FieldList } from './components';
import { ITableEntity } from '@brick/types';

export interface IFieldValueSetContentProps {}

export const FieldValueSetContent: FC<IFieldValueSetContentProps> = (props) => {
  const [tableConfig] = useFieldValueSetSelector((s) => [s.tableConfig]);

  if (!tableConfig) {
    return <></>;
  }
  return (
    <div>
      <FieldList />
      <FieldAdd tableConfig={tableConfig!} />
    </div>
  );
};

export interface IFieldValueSetProps extends Omit<IFieldValueSetProviderProps, 'children'> {}

export const FieldValueSet: FC<IFieldValueSetProps> = (props) => {
  return (
    <FieldValueSetProvider {...props}>
      <FieldValueSetContent />
    </FieldValueSetProvider>
  );
};
