import React, { createContext, FC, useEffect } from 'react';
import { createHeaderDesignProcessor, HeaderDesignProcessor } from './HeaderDesignProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type HeaderDesignProcessorWipe = WipeObservable<typeof HeaderDesignProcessor.prototype>;
export interface IHeaderDesignProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as HeaderDesignProcessor);

export const HeaderDesignProvider: FC<IHeaderDesignProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createHeaderDesignProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};

  useEffect(() => {
    return () => {
      destroy?.();
    };
  }, []);

  return <Context.Provider value={processor!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useHeaderDesignSelector<R extends any>(
  selector: (s: HeaderDesignProcessorWipe) => R
) {
  return generateSelector<R, HeaderDesignProcessorWipe>(Context, selector);
}
