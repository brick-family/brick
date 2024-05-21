import React, { FC } from 'react';
import { Layout } from 'antd';

import { SliderProvider } from './sider/processor';
import { Content } from './content';
import { Sider } from './sider';

import s from './app.less';

const { Sider: AntSlider, Header: AntHeader, Content: AntContent } = Layout;
export interface IAppProps {}

const App: FC<IAppProps> = (props) => {
  return (
    <Layout className={s.layout}>
      <AntSlider style={{ background: '#fff' }} width={260} className={s.slider}>
        <SliderProvider>
          <Sider />
        </SliderProvider>
      </AntSlider>
      <AntContent className={s.content}>
        <Content />
      </AntContent>
    </Layout>
  );
};

export default App;
