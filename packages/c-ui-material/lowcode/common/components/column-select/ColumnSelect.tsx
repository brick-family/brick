import React, { FC, useMemo } from 'react';
import { TreeSelect } from 'antd';
import { EFieldType, IColumnEntity, IColumnRelationConfig } from '@brick/types';

export interface IColumnSelectProps {
  columns: IColumnEntity[];
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

export const ColumnSelect: FC<IColumnSelectProps> = ({ columns, value, onChange }) => {
  const treeData = useMemo(() => {
    if (!columns) {
      return [];
    }
    const result: Array<any> = [];
    columns?.forEach?.((item) => {
      result.push({
        key: item.id,
        title: item.title,
        value: item.id,
        children: getChildren(item),
      });
    });
    return result;
  }, [columns]);

  // 获取所有table columns信息
  const onTreeChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    onChange?.(newValue);
  };

  const tProps = {
    treeData: treeData,
    value: value,
    // size: 'small',
    onChange: onTreeChange,
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
