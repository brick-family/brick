import { useMemo } from 'react';
import { EFieldType, IColumnDecimalConfig, IDataEntity } from '@brick/types';
import { createDataRender } from '../components/column-render';
import { TTableColumn, useDataTableSelector } from '@brick/biz-component';

const defaultColumnWidth: Record<string, number> = {
  [EFieldType.STRING]: 120,
  [EFieldType.TEXT]: 120,
  [EFieldType.RICH]: 140,
  [EFieldType.DECIMAL]: 80,
  [EFieldType.SELECT]: 120,
  [EFieldType.DATE]: 120,
  [EFieldType.RADIO]: 100,
  [EFieldType.SELECT]: 100,
  [EFieldType.IMAGE]: 100,
  [EFieldType.FILE]: 100,
  [EFieldType.USER]: 100,
  [EFieldType.RELATION]: 120,
};

function generateColumn(column: TTableColumn, hasWidth: boolean) {
  const currColumn: any = {
    title: column.title,
    dataIndex: column.dbFieldName,
  };

  if (hasWidth) {
    currColumn.width = defaultColumnWidth[column.fieldType] || 80;
    if (column.system) {
      currColumn.width = 100;
    }
  }

  const dataTime = ['create_time', 'update_time'].includes(column.dbFieldName!);

  const conditionActions = [
    {
      // 时间类型
      condition: dataTime,
      action: () => {
        Object.assign(currColumn, { valueType: 'date' });
      },
    },
    {
      condition: ['id'].includes(column.dbFieldName!),
      action: () => {
        Object.assign(currColumn, { ellipsis: true });
      },
    },
    {
      // 文本字段类型
      condition:
        [EFieldType.TEXT, EFieldType.RICH, EFieldType.STRING].includes(column.fieldType as any) &&
        column.dbFieldName !== 'id',
      action: () => {
        Object.assign(currColumn, { copyable: true, ellipsis: true });
      },
    },
    // {
    //   condition: EFieldType.DATE === column.fieldType,
    //   action: () => {
    //     /**
    //      * 格式化类型 1. YY-MM 2. YYYY-MM-DD 3. YYYY-MM-DD HH:MM 4. YYYY-MM-DD HH:MM:SS
    //      */
    //     const dateConfig = column.columnConfig as IColumnDateConfig;
    //     if (dateConfig.format == 1) {
    //       const dateValue = dayjs(value, 'HH:mm:ss');
    //     }
    //   },
    // },
    {
      // 数字类型
      condition: column.fieldType === EFieldType.DECIMAL,
      action: () => {
        const decimalConfig = column.columnConfig as IColumnDecimalConfig;
        const columnDecimalConfig: any = {
          // align: 'right' // 数字是否居右边显示
        };

        if (decimalConfig.format === 2) {
          // 百分比
          columnDecimalConfig.valueType = () => ({
            type: 'percent',
            precision: decimalConfig?.decimalPlace || 0,
          });
        } else if (decimalConfig.thousands) {
          // 显示千分位 （不支持保留小数位置）
          columnDecimalConfig.valueType = 'digit';
          // columnDecimalConfig.valueType = () => ({
          //   type: 'digit',
          //   // precision: 2 || 0,
          // });
        }
        Object.assign(currColumn, columnDecimalConfig);
      },
    },
    {
      condition: true, // Default condition if none of the above conditions are met
      action: () => {
        // currColumn.ellipsis = true;
        currColumn.render = (text: any, record: IDataEntity) => {
          if (column.hasRelation) {
            const currRelationData = record[column?.relationColumn?.dbFieldName as string]?.[0];
            return createDataRender(column.fieldType, {
              value: currRelationData?.[column?.dbFieldName!],
              column: column,
            });
          }
          return createDataRender(column.fieldType, {
            value: text,
            column: column,
          });
        };
      },
    },
  ];

  // Execute the action corresponding to the first true condition
  const { action } = conditionActions.find(({ condition }) => condition) || {};
  if (action) {
    action();
  }

  return currColumn;
}

/**
 * 根据数据表配置，生成表格列
 */
export const useColumns = (hasWidth: boolean) => {
  const [tableColumns] = useDataTableSelector((s) => [s.tableColumns]);
  const { columns, sumWidth } = useMemo(() => {
    let sumWidth = 30;
    const columns = tableColumns?.map?.((column) => {
      const g = generateColumn(column, hasWidth);
      sumWidth = sumWidth + g?.width || 0;
      return g;
    });
    return {
      columns,
      sumWidth,
    };
  }, [tableColumns, hasWidth]);

  // console.log('q=>sumWidth', sumWidth);

  return { columns, sumWidth };
};
