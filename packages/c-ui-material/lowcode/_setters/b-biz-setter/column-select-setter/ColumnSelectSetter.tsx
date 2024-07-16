import React, { FC, useMemo } from 'react';
import { SetterHoc } from '../../../common';
import { TreeSelect } from 'antd';
import { usePropsValue, useReRenderEvent } from '../../../_hooks';
import { EFieldType, IColumnEntity, IColumnRelationConfig } from '@brick/types';
import { useTableData } from '@brick/biz-component';

export interface IColumnSelectSetterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const getChildren = (column: IColumnEntity) => {
  if (column.fieldType === EFieldType.RELATION) {
    const relationConfig = column.columnConfig as IColumnRelationConfig;
    return (
      relationConfig?.displayFields?.map?.((item) => {
        return {
          key: item.id,
          title: item.title,
          value: item.id,
        };
      }) || []
    );
  }

  return [];
};

const ColumnSelectSetterFun: FC<IColumnSelectSetterProps> = (props) => {
  const { getPropValue } = usePropsValue(props);
  const relationTableId = getPropValue('columnConfig.relationTableId');

  const { table, loading } = useTableData(relationTableId);

  useReRenderEvent();

  const treeData = useMemo(() => {
    if (!table) {
      return [];
    }
    const result: Array<any> = [];
    table?.columns?.forEach?.((item) => {
      result.push({
        key: item.id,
        title: item.title,
        value: item.id,
        children: getChildren(item),
      });
    });
    return result;
  }, [table]);

  // 获取所有table columns信息
  const onChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    props?.onChange?.(newValue);
  };

  const tProps = {
    treeData: treeData,
    value: props?.value,
    // size: 'small',
    onChange,
    // maxTagPlaceholder: '112',
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
    placeholder: '请选择',
    multiple: true,
    maxTagCount: 1,
    style: {
      width: '100%',
    },
  };

  return <TreeSelect {...tProps} size={'small'} />;
};

export const ColumnSelectSetter = SetterHoc(ColumnSelectSetterFun);
