import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, forwardRef, useImperativeHandle, useRef, FC } from 'react';
import s from './AppLogTable.less';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { queryAppLogList } from '@brick/services';
import { useAdminPermLogSelector } from '@/pages/admin/audit/app-log-processor/AdminPermLogProvider';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};

// const columns: ProColumns<TableListItem>[] = [
//   {
//     title: '排序',
//     dataIndex: 'index',
//     valueType: 'indexBorder',
//     width: 48,
//   },
//   {
//     title: '应用名称',
//     dataIndex: 'name',
//     render: (_) => <a>{_}</a>,
//     // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
//     filterDropdown: () => (
//       <div style={{ padding: 8 }}>
//         <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//   },
//   {
//     title: '创建者',
//     dataIndex: 'creator',
//     valueEnum: {
//       all: { text: '全部' },
//       付小小: { text: '付小小' },
//       曲丽丽: { text: '曲丽丽' },
//       林东东: { text: '林东东' },
//       陈帅帅: { text: '陈帅帅' },
//       兼某某: { text: '兼某某' },
//     },
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     initialValue: 'all',
//     filters: true,
//     onFilter: true,
//     valueEnum: {
//       all: { text: '全部', status: 'Default' },
//       close: { text: '关闭', status: 'Default' },
//       running: { text: '运行中', status: 'Processing' },
//       online: { text: '已上线', status: 'Success' },
//       error: { text: '异常', status: 'Error' },
//     },
//   },
//   {
//     title: '备注',
//     dataIndex: 'memo',
//     ellipsis: true,
//     copyable: true,
//   },
//   {
//     title: '操作',
//     width: 180,
//     key: 'option',
//     valueType: 'option',
//     render: () => [
//       <a key="link">链路</a>,
//       <a key="link2">报警</a>,
//       <a key="link3">监控</a>,
//       <TableDropdown
//         key="actionGroup"
//         menus={[
//           { key: 'copy', name: '复制' },
//           { key: 'delete', name: '删除' },
//         ]}
//       />,
//     ],
//   },
// ];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '操作人',
    dataIndex: 'operatorName',
    // ellipsis: true,
  },
  {
    title: '操作时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
  {
    title: '操作类型',
    dataIndex: 'operationType',
  },
  {
    title: '操作对象',
    dataIndex: 'serviceName',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

export interface IAppLogTableProps {}

export interface IAppLogTableRef {}

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
const tableListDataSource: TableListItem[] = [];
for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

export const AppLogTable = forwardRef<IAppLogTableRef, IAppLogTableProps>(({}, ref) => {
  const [appLogList, queryAppLogList] = useAdminPermLogSelector((s) => [
    s.queryAppLogResponse,
    s.getAppLogList,
  ]);

  // useEffect(() => {
  //   console.log('queryAppLogList222222', queryAppLogList, appLogList);
  //   queryAppLogList({ currentPage: 1, pageSize: 10 });
  // }, []);

  console.log('appLogList', appLogList, appLogList?.data?.records);

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log('params2', params);
        return queryAppLogList({
          currentPage: params.current,
          pageSize: params.pageSize,
          keyword: params.keyword,
        }).then((res) => {
          console.log('res', res);
          return {
            data: res?.records,
            success: true,
          };
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: '高级表格',
        tooltip: '这是一个标题提示',
      }}
    />
  );
});
