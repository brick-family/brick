import React, { FC, memo } from 'react';
import { Button, Divider, message, Modal, Space } from 'antd';

import { TransferSelect, TTransferSelectType } from '@brick/biz-component';
import { usePermSelector } from '@/pages/app-admin/perm/perm-processor';
import { IResourcePermEntity } from '@brick/types';
import { CreatePermGroup } from './create-perm-group';

import s from './permSet.less';
import { TagList } from './tag-list';
import { IResourcePermBindDto } from '@brick/services';

export interface IPermSetProps {}

export const PermSet: FC<IPermSetProps> = memo((props) => {
  const [
    setModalData,
    currSelectResource,
    resourcePermList,
    deleteResourcePerm,
    resourcePermBind,
    requestResourcePermList,
  ] = usePermSelector((s) => [
    s.setModalData,
    s.currSelectResource,
    s.resourcePermList,
    s.resourcePermProcessor.deleteResourcePerm,
    s.resourcePermProcessor.resourcePermBind,
    s.requestResourcePermList,
  ]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          // console.log('q=>result1');
          const result = await deleteResourcePerm(id);
          // console.log('q=>result', result);
          if (result) {
            message.success('删除成功！');
          }
        } catch (error) {
          // console.log('q=>result2', error);
          return false;
        }
      },
    });
  };

  const handleUpdate = (resourcePermEntity: IResourcePermEntity) => {
    setModalData({
      type: 'update',
      open: true,
      data: resourcePermEntity,
    });
  };

  const handleCopy = (resourcePermEntity: IResourcePermEntity) => {
    setModalData({
      type: 'copy',
      open: true,
      data: resourcePermEntity,
    });
  };

  const onPermBind = async (keys: string[], type: TTransferSelectType, permId: string) => {
    return await resourcePermBind(
      {
        type: type as IResourcePermBindDto['type'],
        ids: keys,
        permId: permId,
      },
      {
        onSuccess: () => {
          requestResourcePermList?.();
        },
      }
    );
  };

  console.log('resourcePermList', resourcePermList);

  const renderContent = () => {
    return (
      <>
        <CreatePermGroup />
        <Button
          type="primary"
          onClick={() => {
            setModalData({
              open: true,
              type: 'create',
              data: null,
            });
          }}
        >
          添加权限组
        </Button>
        <div className={s.list}>
          {resourcePermList?.data?.map((item) => {
            const permId = item?.resourcePermEntity?.id;
            return (
              <div key={permId} className={s.item}>
                <div className={s.header}>
                  <div className={s.name}>{item?.resourcePermEntity?.name}</div>
                  <div className={s.toolbar}>
                    <Space size={0} split={<Divider type="vertical" />}>
                      <Button size={'small'} type="link">
                        <TransferSelect
                          onOk={(keys, type) => onPermBind(keys, type, permId!)}
                          type={'user'}
                          title={'选择用户'}
                          targetKeys={item?.useList?.map((item) => item.id) || []}
                          userTargetData={item.useList}
                        >
                          设置用户
                        </TransferSelect>
                      </Button>
                      <Button size={'small'} type="link">
                        <TransferSelect
                          onOk={(keys, type) => onPermBind(keys, type, permId!)}
                          type={'role'}
                          title={'选择角色'}
                          targetKeys={item?.roleList?.map((item) => item.id!) || []}
                        >
                          设置角色
                        </TransferSelect>
                      </Button>

                      <Button size={'small'} type="link">
                        <TransferSelect
                          onOk={(keys, type) => onPermBind(keys, type, permId!)}
                          type={'dept'}
                          title={'选择部门'}
                          targetKeys={item?.deptList?.map((item) => item.id!) || []}
                        >
                          设置部门
                        </TransferSelect>
                      </Button>

                      <Button
                        onClick={() => handleCopy(item?.resourcePermEntity!)}
                        size={'small'}
                        type="link"
                      >
                        复制
                      </Button>
                      <Button
                        onClick={() => handleUpdate(item?.resourcePermEntity!)}
                        size={'small'}
                        type="link"
                      >
                        编辑
                      </Button>
                      <Button
                        onClick={() => handleDelete(item?.resourcePermEntity?.id!)}
                        size={'small'}
                        type="link"
                        danger
                      >
                        删除
                      </Button>
                    </Space>
                  </div>
                </div>
                <div className={s.desc}>{item?.resourcePermEntity?.description}</div>
                <div className={s.list}>
                  <TagList data={item} />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className={s.set}>
      <div className={s.title}>2. 配置权限</div>
      <div className={s.content}>
        {!currSelectResource ? <div>请先选择一个资源</div> : renderContent()}
      </div>
    </div>
  );
});
