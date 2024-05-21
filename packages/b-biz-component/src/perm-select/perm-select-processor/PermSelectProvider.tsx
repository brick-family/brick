import React, { createContext, FC, useEffect } from 'react';

import { generateSelector, WipeObservable } from '@brick/core';

import { IPermSelectData } from '@brick/biz-component';
import { IResourceEntity } from '@brick/types';
import { createPermSelectProcessor, PermSelectProcessor } from './PermSelectProcessor';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type PermSelectProcessorWipe = WipeObservable<typeof PermSelectProcessor.prototype>;
export interface IPermSelectProviderProps {
  children: React.ReactElement;
  resourceEntity: IResourceEntity;
  data?: IPermSelectData;
  onChange?: (data: IPermSelectData) => void;
}

const Context = createContext({} as PermSelectProcessor);

export const PermSelectProvider: FC<IPermSelectProviderProps> = ({
  children,
  data,
  onChange,
  resourceEntity,
}) => {
  const processorAction = useCreation(() => {
    return createPermSelectProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};
  useEffect(() => {
    // 监听data变化
    processor.data.onChange((data) => {
      onChange?.(data.value);
    }, {});
    return () => {
      destroy?.();
    };
  }, []);

  useEffect(() => {
    if (data) {
      processor.setData(data);
    }

    if (resourceEntity) {
      processor.setResourceEntity(resourceEntity);
    }
  }, [data, resourceEntity]);

  return <Context.Provider value={processor!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function usePermSelectSelector<R extends any>(selector: (s: PermSelectProcessorWipe) => R) {
  return generateSelector<R, PermSelectProcessorWipe>(Context, selector);
}
