import { Layout } from 'antd';
import React, { FC } from 'react';
import { Header } from '../header';
import s from './simpleLayout.less';
import { NoAuthPage } from '@/layouts/no-auth-page';

const { Sider: AntSlider, Header: AntHeader, Content: AntContent } = Layout;
export interface ISimpleLayoutProps {
  children: React.ReactElement;
}

export const SimpleLayout: FC<ISimpleLayoutProps> = (props) => {
  return (
    <Layout className={s.layout}>
      <Header></Header>

      <NoAuthPage>
        <AntContent className={s.content}>{props.children}</AntContent>
      </NoAuthPage>
    </Layout>
  );
};
