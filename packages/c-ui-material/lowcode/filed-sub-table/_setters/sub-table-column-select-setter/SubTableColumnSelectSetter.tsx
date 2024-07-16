import React, { FC } from 'react';
import { ColumnSelect, SetterHoc } from '../../../common';
import { usePropsValue, useReRenderEvent } from '../../../_hooks';
import { useCreation } from 'ahooks';
import { EFieldType } from '@brick/types';
import { getUrlResourceId } from '@brick/utils';
import { useTableData } from '@brick/biz-component';

export interface ISubTableColumnSelectSetterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const SubTableColumnSelectSetterFun: FC<ISubTableColumnSelectSetterProps> = (props) => {
  const { getPropValue } = usePropsValue(props);
  const subTableId = getPropValue('columnConfig.subTableId');
  // 当前关联表
  const relationTableId = getUrlResourceId();

  const { table, loading } = useTableData(subTableId);

  const columns = useCreation(() => {
    return (
      table?.columns?.map((item) => {
        // 如果是关联数据，并且关联的是自己, columnConfig 设置为空
        if (
          item.fieldType === EFieldType.RELATION &&
          item?.columnConfig?.relationTableId === relationTableId
        ) {
          return {
            ...item,
            columnConfig: {},
          };
        }

        return item;
      }) || []
    );
  }, [table?.columns]);

  useReRenderEvent();
  return <ColumnSelect columns={columns} value={props.value} onChange={props.onChange} />;
};

export const SubTableColumnSelectSetter = SetterHoc(SubTableColumnSelectSetterFun);
