import { useGlobalSelector } from '@/global-processor';
import { useMemoizedFn } from 'ahooks';
import { Button, Dropdown } from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import React, { FC, memo } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { history } from 'umi';
import s from './tenantList.less';

export interface ITenantListProps {}

export const TenantList: FC<ITenantListProps> = memo((props) => {
  const [userInfo, currTenant, setCurrTenant] = useGlobalSelector((s) => [
    s.userInfo,
    s.currTenant,
    s.setCurrTenant,
  ]);

  const onItemClick = useMemoizedFn((key) => {
    const tenant = userInfo?.tenantList?.find((f) => f.id == key);
    if (tenant) {
      setCurrTenant(tenant);
      // 跳转到根路由
      history.push('/');
      window.location.reload();
    }
  });

  const dropdownRender = () => {
    return (
      <>
        {userInfo?.tenantList?.map((item: any) => {
          return (
            <CheckCard
              size="small"
              title={item.name}
              value={item.id}
              checked={currTenant?.id == item.id}
              key={item.id}
              onClick={() => onItemClick(item.id)}
              // style={{ margin: 0, borderRadius: 0 }}
            />
          );
        })}
      </>
    );
  };

  return (
    <Dropdown
      overlayClassName={`${s.content}`}
      dropdownRender={dropdownRender}
      // trigger={['click']}
    >
      <Button type="text" style={{ padding: '0 10px' }}>
        {currTenant.name}
        {/* <DownOutlined /> */}
        <CaretDownOutlined style={{ color: '#666', marginLeft: 4 }} />
      </Button>
    </Dropdown>
  );
});
