import React, { FC } from 'react';
import { ColumnSelect, SetterHoc } from '../../../common';
import { usePropsValue, useReRenderEvent } from '../../../_hooks';
import { useCreation } from 'ahooks';
import { EFieldType } from '@brick/types';
import { excludeFieldsByType } from '@brick/utils';
import { useTableData } from '@brick/biz-component';

export interface IRelationColumnSelectSetterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const RelationColumnSelectSetterFun: FC<IRelationColumnSelectSetterProps> = (props) => {
  const { getPropValue } = usePropsValue(props);
  const relationTableId = getPropValue('columnConfig.relationTableId');

  useReRenderEvent();

  const { table, loading } = useTableData(relationTableId);

  const columns = useCreation(() => {
    // 关联数据排除字表
    return excludeFieldsByType(table?.columns!, [EFieldType.SUBTABLE, EFieldType.RELATION]);
  }, [table?.columns]);

  return <ColumnSelect columns={columns} value={props.value} onChange={props.onChange} />;
};

export const RelationColumnSelectSetter = SetterHoc(RelationColumnSelectSetterFun);
