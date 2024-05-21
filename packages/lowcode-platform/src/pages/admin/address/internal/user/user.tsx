import { deleteUser, IQueryUserParams, queryUser } from '@brick/services';
import { IUserEntity } from '@brick/types';
import { ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { CreateOrUpdate, ICreateOrUpdateProps } from './create-or-update';
import { useImmer } from 'use-immer';
import s from '../internal.less';
import { useTableScroll } from '@/hooks';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';
import { Button, message, Modal, Space } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { MoveDeptOperation } from '@/pages/admin/address/internal/user/components';
import { MoveUserOperation } from './components/move-user-operation';

export interface IUserProps {
  type: 'dept' | 'role';
}

export const User: FC<IUserProps> = ({ type }) => {
  const actionRef = useRef<ActionType>();
  const [selectData] = useInternalSelector((s) => [s.selectData]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [state, setState] = useImmer<ICreateOrUpdateProps>({
    open: false,
    type: 'create',
  });

  const showToolbar = selectedRowKeys?.length <= 0;
  const selectId = selectData?.id;

  // 表格查询参数
  const [queryParams, setQueryParams] = useImmer<
    Omit<IQueryUserParams, 'currentPage' | 'pageSize'>
  >({
    keywords: '',
    deptId: type === 'dept' ? selectId : '',
    roleId: type === 'role' ? selectId : '',
  });

  useEffect(() => {
    actionRef.current?.clearSelected?.();
  }, [type]);

  useEffect(() => {
    setQueryParams((draft) => {
      if (type === 'dept') {
        // dept 1 是全部成员， 2 为离职成员
        draft.deptId = selectId === '1' || selectId === '2' ? '' : selectId;
        draft.roleId = '';
      } else {
        draft.deptId = '';
        draft.roleId = selectId;
      }
    });
  }, [selectId]);

  const { scroll, containerRef } = useTableScroll(180);
  const columns: ProColumns<IUserEntity>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setState((draft) => {
              draft.type = 'update';
              draft.open = true;
              draft.user = record;
            });
          }}
        >
          编辑
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => {
            if (key === 'rePwd') {
              return;
            }
            if (key === 'delete') {
              Modal.confirm({
                title: '确定要删除吗？',
                onOk: async (close) => {
                  try {
                    const result = await deleteUser(record?.id!);
                    if (result) {
                      message.success('删除成功！');
                      actionRef?.current?.reload();
                    }
                    close();
                  } catch (error) {
                    return false;
                  }
                },
              });
              return;
            }
          }}
          menus={[
            { key: 'rePwd', name: '修改密码' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  const handleAddClick = useMemoizedFn(() => {
    setState((draft) => {
      draft.type = 'create';
      draft.open = true;
      draft.user = { status: 1 } as IUserEntity;
    });
  });

  const onClose = useMemoizedFn(() => {
    setState((draft) => {
      draft.type = 'create';
      draft.open = false;
    });
  });

  const onSuccess = useMemoizedFn(() => {
    actionRef.current?.reload();
  });

  const rowSelection: TableRowSelection<IUserEntity> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
  };

  const onOperationSuccess = () => {
    actionRef.current?.reload?.();
    actionRef.current?.clearSelected?.();
  };

  return (
    <div className={s.user} ref={containerRef}>
      <CreateOrUpdate {...state} onClose={onClose} onSuccess={onSuccess} />
      <ProTable<IUserEntity>
        columns={columns}
        actionRef={actionRef}
        size={'middle'}
        params={queryParams}
        rowSelection={{
          ...rowSelection,
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          console.log(selectedRowKeys, selectedRows);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <MoveDeptOperation
                userIds={selectedRowKeys as Array<string>}
                onSuccess={onOperationSuccess}
              />
              <Button size={'small'} icon={<UsergroupDeleteOutlined />} type="text">
                设为离职
              </Button>
            </Space>
          );
        }}
        tableAlertOptionRender={({ onCleanSelected }) => {
          return (
            <Space size={16}>
              <a onClick={onCleanSelected}>取消选中</a>
            </Space>
          );
        }}
        options={
          showToolbar
            ? false
            : {
                setting: {
                  listsHeight: 400,
                },
              }
        }
        toolbar={
          showToolbar
            ? {
                search: {
                  placeholder: '姓名，邮箱，手机号',
                  onSearch: (value: string) => {
                    setQueryParams((draft) => {
                      draft.keywords = value;
                    });
                  },
                },
              }
            : {}
        }
        toolBarRender={
          showToolbar
            ? () => [
                type === 'role' ? (
                  <MoveUserOperation roleIds={[selectId]} onSuccess={onOperationSuccess} />
                ) : (
                  <Button key="add" type="primary" onClick={handleAddClick}>
                    新增用户
                  </Button>
                ),
                <Button key="export">导出</Button>,
              ]
            : false
        }
        request={async (params, sort, filter) => {
          const { pageSize, current, ...otherParams } = params;
          console.log('q=>otherParams', otherParams);
          const result = await queryUser({
            pageSize: pageSize!,
            currentPage: current!,
            ...queryParams,
          });
          return {
            page: current,
            data: result?.records || [],
            success: true,
            total: result?.total || 0,
          };
        }}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        scroll={{
          ...scroll,
        }}
        // dateFormatter="string"
        // headerTitle="高级表格"
      />
    </div>
  );
};
