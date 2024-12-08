import { useEffect, forwardRef, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { deleteAppLog } from '@brick/services';
import { useAdminPermLogSelector } from '@/pages/admin/audit/app-log-processor/AdminPermLogProvider';
import { IAppLogEntity } from '@brick/types';

export interface IAppLogTableProps {}

export interface IAppLogTableRef {}

export const AppLogTable = forwardRef<IAppLogTableRef, IAppLogTableProps>(({}, ref) => {
  const [
    appLogList,
    queryAppLogList,
    createUsers,
    getCreateUserList,
    operationType,
    getOperationTypeList,
  ] = useAdminPermLogSelector((s) => [
    s.queryAppLogResponse,
    s.getAppLogList,
    s.createUsers,
    s.getCreateUserList,
    s.operationType,
    s.getOperationTypeList,
  ]);

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    getCreateUserList();
    getOperationTypeList();
  }, []);

  const handleDelete = (id: string) => {
    deleteAppLog(id)
      .then(() => {
        actionRef.current?.reload();
        message.success('删除成功');
      })
      .catch(() => {
        message.error('删除失败');
      });
  };

  const columns: ProColumns<IAppLogEntity>[] = [
    {
      title: '操作人',
      key: 'createUser',
      dataIndex: 'createUser',
      valueType: 'select',
      valueEnum:
        createUsers?.data?.reduce(
          (acc, user) => ({
            ...acc,
            [user]: { text: user },
          }),
          {}
        ) || {},
      // ellipsis: true,
    },
    {
      title: '操作状态',
      key: 'success',
      dataIndex: 'success',
      valueType: 'select',
      valueEnum: {
        true: { text: '操作成功' },
        false: { text: '操作失败' },
      },
      render: (_, record) => {
        return record.success ? '操作成功' : '操作失败';
      },
    },
    {
      title: '操作类型',
      key: 'operationType',
      dataIndex: 'operationType',
      valueType: 'select',
      valueEnum:
        operationType?.data?.reduce(
          (acc, type) => ({
            ...acc,
            [type]: { text: type },
          }),
          {}
        ) || {},
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      search: {
        transform: (value: any) => ({
          startCreateTime: value[0],
          endCreateTime: value[1],
        }),
      },
      render: (_, record) => {
        return record.createTime;
      },
    },
    {
      title: '描述',
      key: 'description',
      search: false,
      dataIndex: 'description',
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={() => {
            handleDelete(record?.id!);
          }}
          key="2"
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <ProTable<IAppLogEntity>
      actionRef={actionRef}
      columns={columns}
      request={async ({ current, pageSize, ...params }) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log('params2', params);
        return queryAppLogList({
          currentPage: params?.current,
          pageSize: params?.pageSize,
          ...params,
        }).then((res) => {
          return {
            data: res?.records,
            total: res?.total,
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
