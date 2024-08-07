import { ActionType, ProTable } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';

import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { convertDataFilterByRuleType, Create, QueryFilter, SelectToolbar } from './components';
import { useImmer } from 'use-immer';
// import { state22 } from './services/DataTableService';
import s from './dataTable.less';
import { useDataTableSelector } from './processor';
import { ITableEntity } from '@brick/types';
import { RuleType } from 'react-querybuilder';
import { useColumnState } from './hooks';
import { useColumns } from './hooks/useColumns';
import { TablePaginationConfig } from 'antd/es/table/interface';

export interface IDataTableProps {}

export interface IDataTableRef {
  /**
   * 重新加载表格
   */
  reload: () => void;
}

/**
 * toolbar左侧信息
 * @returns
 */
const ToolBarLeft = React.memo(() => {
  const [feature] = useDataTableSelector((s) => [s.feature]);
  return <div>{feature.hasCreate && <Create />}</div>;
});

export const Table = React.forwardRef<IDataTableRef, IDataTableProps>(({}, ref) => {
  const [
    queryDataResponse,
    setQueryDataParamsObservable,
    table,
    refresh,
    itemDetailProcessor,
    tableColumns,
    queryDataParams,
  ] = useDataTableSelector((s) => [
    s.dataProcessor.queryDataResponse,
    s.dataProcessor.setQueryDataParamsObservable,
    s.table,
    s.refresh,
    s.itemDetailProcessor,
    s.tableColumns,
    s.dataProcessor.queryDataParams,
  ]);
  const actionRef = useRef<ActionType>();
  const [tableSetting, setTableSetting] = useImmer<{
    hasToolbar: boolean;
  }>({ hasToolbar: true });

  const [selectData, setSelectData] = useImmer<{
    selectedRowKeys: React.Key[];
    selectedRows: ITableEntity[];
  }>({
    selectedRowKeys: [],
    selectedRows: [],
  });

  useEffect(() => {
    return () => {};
  }, []);

  useImperativeHandle(ref, () => {
    return {
      reload: () => {
        refresh?.();
      },
    };
  });

  const { columnsState, hasWidth } = useColumnState();

  const { columns, sumWidth } = useColumns(hasWidth);

  const handleChange = useMemoizedFn((value: RuleType[]) => {
    setQueryDataParamsObservable((draft) => {
      const newValue = convertDataFilterByRuleType(value);

      draft.filterExpressionList.set(newValue);
      draft.currentPage.set(1);
    });
  });

  const onChange = useMemoizedFn((pagination: TablePaginationConfig) => {
    const { current, pageSize } = pagination;

    // 分页查询
    setQueryDataParamsObservable((draft) => {
      draft.currentPage.set(current);
      draft.pageSize.set(pageSize);
    });
  });

  const toolBarRender = useMemoizedFn((action, rows) => {
    console.log('table.data', table.data);

    return [
      <QueryFilter onChange={handleChange} tableConfig={table.data} />,
      <div>toolBarRender1</div>,
    ];
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setTableSetting((draft) => {
        draft.hasToolbar = !(selectedRowKeys.length > 0);
      });

      setSelectData((draft) => {
        draft.selectedRowKeys = selectedRowKeys;
        draft.selectedRows = selectedRows;
      });
      // tableSelectData
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onCancel = useMemoizedFn(() => {
    // setSelectData((draft) => {
    //   draft.selectedRowKeys = [];
    //   draft.selectedRows = [];
    // });
    actionRef.current?.clearSelected?.();
  });

  const tableAlertRender = useMemoizedFn(() => {
    return <SelectToolbar onCancel={onCancel} selectData={selectData.selectedRows} />;
  });

  const tableAlertOptionRender = useMemoizedFn(() => {
    return <div>111</div>;
  });

  const onRowClick = (record: any) => {
    console.log('q=>record', record);
    // 打开详情
    itemDetailProcessor?.open({
      mode: 'detail',
      openType: 'modal',
      tableId: table.data.id as unknown as string,
      itemId: record.id,
    });
  };

  console.log('q=>queryDataResponse', queryDataResponse, queryDataResponse?.data?.total);
  return (
    <>
      <ProTable
        actionRef={actionRef}
        className={s.table}
        columns={columns || []}
        search={false}
        // @ts-ignore
        columnEmptyText={null}
        rowKey={'id'}
        toolBarRender={tableSetting.hasToolbar ? toolBarRender : false}
        toolbar={{
          title: <ToolBarLeft />,
        }}
        scroll={hasWidth ? { x: sumWidth } : undefined}
        columnsState={columnsState!}
        options={{
          density: true,
          fullScreen: true,
          // search: true,
          setting: {
            draggable: true,
            checkable: true,
          },
        }}
        // TODO 类型待处理
        loading={queryDataResponse.loading}
        dataSource={queryDataResponse?.data?.records || []}
        pagination={{
          total: queryDataResponse?.data?.total || 0,
          pageSize: queryDataParams.pageSize,
          current: queryDataParams.currentPage,
          showSizeChanger: true,
        }}
        onChange={onChange}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={tableAlertOptionRender}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          columnWidth: 30,
          selectedRowKeys: selectData.selectedRowKeys,
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onRowClick?.(record);
            }, // 点击行
          };
        }}
      />
    </>
  );
});
