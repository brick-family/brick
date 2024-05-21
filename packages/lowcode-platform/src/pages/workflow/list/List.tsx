import React, { FC, useEffect } from 'react';
import s from './list.less';
import { useWorkflowPageSelector } from '@/pages/workflow/workflow-processor';
import { Header } from '@/pages/workflow/list/header';
import { ProCard, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { EWorkflowStatus, IWorkflowEntity } from '@brick/types';
import { history } from 'umi';
import { message, Modal, Switch } from 'antd';
import { BEmpty } from '@brick/component';
import { deleteWorkflow } from '@brick/services';

export interface IListProps {}

export const List: FC<IListProps> = (props) => {
  const [requestWorkflowListAll, workflowGroupList, updateWorkflowStatus, workflowList] =
    useWorkflowPageSelector((s) => [
      s.workflowProcessor.requestWorkflowListAll,
      s.workflowGroupList,
      s.updateWorkflowStatus,
      s.workflowProcessor.workflowList,
    ]);

  useEffect(() => {
    requestWorkflowListAll();
  }, []);

  const handleChange = (id: string, checked: boolean) => {
    updateWorkflowStatus(id, checked ? EWorkflowStatus.enable : EWorkflowStatus.disable);
  };

  const onOptionSelect = (key: string, item: IWorkflowEntity) => {
    if (key === 'delete') {
      Modal.confirm({
        title: '确定要删除吗？',
        onOk: async (close) => {
          try {
            const result = await deleteWorkflow(item.id!);
            if (result) {
              requestWorkflowListAll();
              message.success('删除成功！');
            }
          } catch (error) {
            return false;
          }
        },
      });

      return;
    }
    if (key === 'copy') {
    }
  };

  const columns: ProColumns<IWorkflowEntity>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => {
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(checked) => handleChange(record.id!, checked)}
            checked={record.status === EWorkflowStatus.enable}
          />
        );
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // 去编辑页面
            history.push(`workflow/${record.id}/design`);
          }}
        >
          编辑
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => onOptionSelect(key, record)}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <div className={s.list}>
      <Header />
      <div className={s.content}>
        {!workflowList?.loading && workflowList?.data?.length === 0 && <BEmpty />}
        {workflowGroupList?.map((item) => {
          return (
            <ProCard
              key={item?.refData?.id}
              title={item?.refData?.title}
              headerBordered
              collapsible
              size={'small'}
            >
              <ProTable<IWorkflowEntity>
                columns={columns}
                cardBordered
                dataSource={item.children}
                rowKey="id"
                size={'small'}
                search={false}
                options={{
                  setting: {
                    listsHeight: 400,
                  },
                }}
                pagination={false}
                dateFormatter="string"
                toolBarRender={false}
              />
            </ProCard>
          );
        })}
      </div>
    </div>
  );
};
