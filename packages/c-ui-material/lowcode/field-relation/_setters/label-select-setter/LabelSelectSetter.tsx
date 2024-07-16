import React, { FC } from 'react';
import { SetterHoc } from '../../../common';
import { usePropsValue, useReRenderEvent } from '../../../_hooks';
import { useCreation } from 'ahooks';
import { excludeFieldsByType } from '@brick/utils';
import { EFieldType } from '@brick/types';
import { SelectSetterFun } from '../../../_setters';
import { useTableData } from '@brick/biz-component';

export interface ILabelSelectSetterProps {
  value: string;
  onChange: (value: string) => void;
}

const LabelSelectSetterFun: FC<ILabelSelectSetterProps> = (props) => {
  const { getPropValue } = usePropsValue(props);
  const relationTableId = getPropValue('columnConfig.relationTableId');

  useReRenderEvent();

  const { table, loading } = useTableData(relationTableId);
  const options = useCreation(() => {
    // 关联数据排除字表
    const columns = excludeFieldsByType(table?.columns!, [
      EFieldType.SUBTABLE,
      EFieldType.RELATION,
    ]);
    return columns.map((item) => ({ label: item.title, value: item.dbFieldName }));
  }, [table?.columns]);

  return (
    <SelectSetterFun
      changeReRenderEvent
      onChange={props.onChange}
      value={props.value}
      options={options}
    />
  );
};

export const LabelSelectSetter = SetterHoc(LabelSelectSetterFun);
