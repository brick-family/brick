import React, { FC } from 'react';
import { App } from './app';
import { WrapperContent } from '@/components/wrapper';
import { MainProvider } from './main-processor';

export interface IMainProps {}

export const Main: FC<IMainProps> = (props) => {
  return (
    <MainProvider>
      <WrapperContent>
        <App />
      </WrapperContent>
    </MainProvider>
  );
};

export default Main;
