import { Layout } from 'antd';
import React, { FC } from 'react';
import { HeaderDesign } from '../hader-design';

import s from './mainLayout.less';
import { NoAuthPage } from '@/layouts/no-auth-page';

const { Sider: AntSlider, Header: AntHeader, Content: AntContent } = Layout;

export interface IMainLayoutProps {
  children: React.ReactElement;
}

export const MainLayout: FC<IMainLayoutProps> = (props) => {
  return (
    <Layout className={s.layout}>
      <HeaderDesign />
      <NoAuthPage>{props.children}</NoAuthPage>
    </Layout>
  );
};
