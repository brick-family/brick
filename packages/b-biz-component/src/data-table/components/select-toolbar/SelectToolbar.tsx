import React, { FC } from 'react';

import s from './selectToolbar.less';
import { Button, message, Modal, Space } from 'antd';
import { CloseOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { ITableEntity } from '@brick/types';
import { useMemoizedFn } from 'ahooks';
import { useDataTableSelector } from '@brick/biz-component';

export interface ISelectToolbarProps {
  selectData: ITableEntity[];
  onCancel: () => void;
}

export const SelectToolbar: FC<ISelectToolbarProps> = ({ selectData, onCancel }) => {
  const [refresh, batchDeleteData, tableId] = useDataTableSelector((s) => [
    s.refresh,
    s.dataProcessor.batchDeleteData,
    s.tableId,
  ]);
  const onBatchDelete = useMemoizedFn(() => {
    console.log('q=>selectData', selectData);
    if (selectData?.length <= 0) {
      message.warning('请选择要删除的数据！');
      return;
    }
    Modal.confirm({
      title: `确定要删除 ${selectData?.length} 条数据吗？`,
      onOk: async (close) => {
        try {
          await batchDeleteData({
            tableId: tableId,
            ids: selectData.map((item) => item.id!),
          });
          message.success('删除成功！');
          refresh();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  });

  const onBatchUpdate = useMemoizedFn(() => {});

  return (
    <div className={s.selectToolbar}>
      <Space>
        <Button
          size={'small'}
          onClick={onCancel}
          className="icon-button"
          style={{ background: 'unset' }}
          icon={<CloseOutlined />}
        ></Button>
        <Button size={'small'} icon={<DeleteOutlined />} onClick={onBatchDelete}>
          删除
        </Button>
        <Button size={'small'} icon={<FormOutlined />}>
          批量修改
        </Button>
      </Space>
    </div>
  );
};
