import React, { FC } from 'react';
import { SetterHoc } from '../../../common';
import { usePropsValue } from '../../../_hooks';
import { QueryFilter, useTableData } from '@brick/biz-component';

export interface IFilterSetterProps {}

const FilterSetterFun: FC<IFilterSetterProps> = (props) => {
  const { getPropValue } = usePropsValue(props);
  const relationTableId = getPropValue('columnConfig.relationTableId');

  const { table, loading } = useTableData(relationTableId);
  return <div>{table && <QueryFilter tableConfig={table!} />}</div>;
};

export const FilterSetter = SetterHoc(FilterSetterFun);
