import { BankOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import React, { FC, useMemo } from 'react';
import { history } from 'umi';

import s from './user.less';
import { logout } from '@brick/services';
import { goLogin } from '@brick/utils';
import { useGlobalSelector } from '@/global-processor';

export interface IUserProps {}

export const User: FC<IUserProps> = (props) => {
  const [userInfo, currTenant, isAdmin] = useGlobalSelector((s) => [
    s.userInfo,
    s.currTenant,
    s.isAdmin,
  ]);
  const userName = userInfo?.user?.name;

  const items = useMemo(() => {
    const result: MenuProps['items'] = [
      {
        key: '2',
        icon: <LogoutOutlined style={{ fontSize: 14 }} />,
        label: '退出登录',
        onClick: async () => {
          await logout();
          goLogin();
        },
      },
    ];

    if (isAdmin) {
      result.unshift({
        key: '1',
        icon: <BankOutlined style={{ fontSize: 14 }} />,
        label: '企业管理',
        onClick: async () => {
          history.push(`/admin/${currTenant?.id}/base/info`);
        },
      });
    }

    return result;
  }, [isAdmin]);

  return (
    <Dropdown menu={{ items }}>
      <div className={s.user}>
        <Avatar
          style={{ verticalAlign: 'middle' }}
          src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
          size={26}
        >
          {userName}
        </Avatar>
        <span className={s.name}>{userName}</span>
      </div>
    </Dropdown>
  );
};
