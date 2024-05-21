import { useCreation, useDebounceFn } from 'ahooks';
import { ColumnsState } from '@ant-design/pro-components';
import { useDataTableSelector } from '@brick/biz-component';
import { useEffect, useMemo, useState } from 'react';

// 显示宽度的最大列
const COLUMN_LENGTH = 6;
/**
 * 获取列的显示状态
 */
export const useColumnState = () => {
  const [tableProcessor, table, tableColumns] = useDataTableSelector((s) => [
    s.tableProcessor,
    s.table,
    s.tableColumns,
  ]);

  const [value, setValue] = useState<Record<string, ColumnsState>>();
  const columnState = value || table.data?.columnState;

  const realValue = useMemo(() => {
    const currValue: Record<string, ColumnsState> = {};
    tableColumns?.forEach((item, index) => {
      const currColumnState = columnState?.[item.dbFieldName as string];

      if (currColumnState) {
        currValue[item.dbFieldName!] = currColumnState;
      } else {
        currValue[item.dbFieldName!] = {
          show: item.hasRelation ? false : !item.system, // 系统字段设置为false
          // order: index,
        };
      }
    });
    return currValue;
  }, [tableColumns, columnState, value]);

  useEffect(() => {
    if (table.data?.columnState) {
      setValue(table.data?.columnState);
    }
  }, [table.data?.columnState]);

  const { run } = useDebounceFn(
    (map) => {
      tableProcessor.updateOnlyTable({
        id: table?.data?.id,
        columnState: map,
      });
    },
    {
      wait: 500,
    }
  );

  const columnsState = useCreation(() => {
    return {
      onChange: (map: Record<string, ColumnsState>) => {
        setValue(map);
        run(map);
      },
      value: realValue,
    };
  }, [realValue]);

  const hasWidth = useCreation(() => {
    const columnLength = Object.values(realValue || {})?.filter((f: any) => f.show).length;
    return columnLength > COLUMN_LENGTH;
  }, [realValue]);

  return { columnsState, hasWidth };
};
