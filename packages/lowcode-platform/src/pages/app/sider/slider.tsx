import React, { FC, useEffect, useLayoutEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Button, Dropdown, MenuProps, message, Space } from 'antd';
import { history, useParams } from 'umi';

import { CreateGroup } from '@/pages/app/sider/common';
import { Menu } from '@/pages/app/sider/menu';
import { EResourceType } from '@brick/types';
import { useSliderSelector } from './processor';
import { BSearch } from '@brick/component';
import { getDefaultResource } from '@brick/services';

import s from './slider.less';
import { AppAdminAuthWrapper, useAppAdmin } from '@brick/biz-component';
import { PlusOutlined } from '@ant-design/icons';

export interface ISliderProps {}

export const Sider: FC<ISliderProps> = (props) => {
  const { aId, resourceId } = useParams();

  const { isAppAdmin } = useAppAdmin();
  const [
    requestResource,
    createResource,
    setSearchTreeKeyWords,
    setCreateModalData,
    setResourceId,
  ] = useSliderSelector((s) => [
    s.resourceProcessor.requestResourceAll,
    s.resourceProcessor.createResource,
    s.resourceProcessor.setSearchTreeKeyWords,
    s.modalProcessor.setCreateModalData,
    s.setResourceId,
  ]);

  useLayoutEffect(() => {
    requestResource();
  }, []);

  useEffect(() => {
    setResourceId(resourceId!);
  }, [resourceId]);

  const handleCreateForm = () => {
    const resource = getDefaultResource(EResourceType.TABLE);
    createResource(resource, {
      onSuccess: (data) => {
        history.push(`/app/${aId}/${data.id}/design`);
      },
    });
  };

  const handleTaskForm = () => {
    message.info('敬请期待～');
  };

  const handleCreateGroup = useMemoizedFn(() => {
    setCreateModalData();
  });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>新建普通表单</span>,
      onClick: (info) => {
        handleCreateForm();
      },
    },
    {
      key: '2',
      label: <span>新建流程表单</span>,
      onClick: () => {
        handleTaskForm();
      },
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: <span>新建分组</span>,
      onClick: () => {
        handleCreateGroup();
      },
    },
  ];

  const goAdmin = () => {
    history.push(`/admin/app/${aId}/perm`);
  };

  const searchJsx = (
    <BSearch
      style={{ width: '100%' }}
      placeholder={'请输入名称'}
      onSearch={setSearchTreeKeyWords}
    />
  );
  return (
    <div className={s.slider}>
      <div className={s.header}>
        {isAppAdmin ? (
          <Space>
            {searchJsx}
            <AppAdminAuthWrapper>
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Button shape="circle" type="primary" icon={<PlusOutlined />}></Button>
              </Dropdown>
            </AppAdminAuthWrapper>
          </Space>
        ) : (
          searchJsx
        )}
      </div>

      <Menu />
      {/* <div className={s.bottom}>
        <Button onClick={goAdmin} style={{ width: 80 }} type="text">pnpm管理后台</Button>
      </div> */}
      <CreateGroup />
    </div>
  );
};
