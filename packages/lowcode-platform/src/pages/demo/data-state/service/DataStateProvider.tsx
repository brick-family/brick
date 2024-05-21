import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { DataStateService, IDataState } from './DataStateService';
import { useObservable, useSelector } from '@legendapp/state/react';
import { isArray, isFunction, isObject, isObservable } from '@legendapp/state';
import { BLoading } from '@brick/component';
import { generateSelector, getSelectorData } from '@brick/core';

export const Context = createContext({} as DataStateService);

export interface IDataStateProviderProps {
  children: React.ReactElement;
}

export const DataStateProvider: FC<IDataStateProviderProps> = (props) => {
  const [dataStateServiceState, setDataStateServiceState] = useState<DataStateService>();
  useEffect(() => {
    const dataStateService = new DataStateService();
    if (dataStateService.isReady()) {
      setDataStateServiceState(dataStateService);
    }
  }, []);

  if (!dataStateServiceState) {
    return <BLoading />;
  }

  return <Context.Provider value={dataStateServiceState}>{props.children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useDataStateSelector<R extends any>(selector: (s: DataStateService) => R) {
  return generateSelector<R, DataStateService>(Context, selector);
}
