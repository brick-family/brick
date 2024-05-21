import React, { FC } from 'react';
import { DataStateProvider } from './service/DataStateProvider';
import { List } from './components/List';
import { enableLegendStateReact } from '@legendapp/state/react';
import { Test } from './components/Test';

// enableLegendStateReact();

export interface IDataStateProps {}

export const DataState: FC<IDataStateProps> = (props) => {
  return (
    <DataStateProvider>
      <List />
      {/* <Add /> */}
      {/* <Test /> */}
      {/* <New /> */}
    </DataStateProvider>
  );
};
