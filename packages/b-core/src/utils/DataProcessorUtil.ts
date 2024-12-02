import React, { useContext } from 'react';

import { batch, isArray, isFunction, isObservable, Observable, observable } from '@legendapp/state';
import { useSelector } from '@legendapp/state/react';
import { IProcessorRequestOptions, IResponseQuery, TObservablePortal } from '../types';
import { generateRequest } from './generateRequest';

export function getObservableValue(currState: unknown) {
  if (isObservable(currState)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = useSelector(currState, {});
    if (res?.get) {
      return res?.get?.();
    }
    return res;
  }

  console.error('get observable value error!');
  return null;
}

/**
 * 判断当前传入的如果是Observable对象，返回Selector后的数据，否则返回原始值
 * @param currState
 * @returns
 */
export function handleObservable(currState: unknown) {
  if (isObservable(currState)) {
    return getObservableValue(currState);
  }
  return currState;
}

/**
 * 获取SelectData
 * @param currState
 * @returns
 */
export function getSelectorData(currState: unknown) {
  // console.log('q=>getState', currState);
  if (isObservable(currState)) {
    return getObservableValue(currState);
  }
  if (isFunction(currState)) {
    return currState;
  }
  if (isArray(currState)) {
    return currState.map((curr) => {
      return handleObservable(curr);
    });
  }
  // if (isObject(currState)) {
  //   const newObject: Record<string, unknown> = {};
  //   Object.keys(currState).forEach(key => {
  //     newObject[key] = handleObservable(currState[key]);
  //   })
  //   return newObject;
  // }
}

export function generateSelector<R extends any, S extends any>(
  Context: React.Context<any>,
  selector: (s: S) => R
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tableState = useContext(Context);
  let currState = selector(tableState);

  currState = getSelectorData(currState);
  return currState;
}

/**
 * 创建默认的返回query结构
 * @returns
 */
export const createDefaultResponseQuery = () => {
  return observable<IResponseQuery>({ loading: false, data: null });
};

/**
 * 创建默认的React Portal数据
 * @returns
 */
export const createDefaultObservablePortal = () => {
  return observable({ Portal: () => React.createElement(React.Fragment) }) as any;
};

// public setDataObservable = (updateCallback: (d: Observable<IPermSelectData>) => void) => {
//   updateCallback(this.data);
// };

/**
 * 生成set observable方法
 * @param dataObservable
 */
export const generateSetObservable = <T = any>(dataObservable: Observable<T>) => {
  return (updateCallback: (d: Observable<T>) => void) => {
    // 批量更新
    batch(() => {
      updateCallback(dataObservable);
    });
  };
};

/**
 * 设置Observable React Portal数据
 * @param params { dataObservable: 当前observable对象 , portalFunction: React Portal函数 }
 */
export const setObservablePortal = (params: {
  dataObservable: TObservablePortal;
  portalFunction: React.FunctionComponent<any>;
}) => {
  const { dataObservable, portalFunction } = params;
  dataObservable?.set({
    Portal: portalFunction,
    _update_key: Math.random(),
  });
};

type FunctionWithParams<T extends any[], R> = (...args: T) => Promise<R>;

/**
 * 普通的请求函数包装器
 * @param originalFn
 */
export function withProcessorRequestWrapper<T extends any[], R>(
  originalFn: FunctionWithParams<T, R>
) {
  return async (...args: [...args: T, options?: IProcessorRequestOptions]) => {
    const params = args.slice(0, originalFn.length) as Parameters<typeof originalFn>;
    const options = args[args.length - 1] !== undefined ? args[args.length - 1] : undefined;
    return await generateRequest<R>(async () => originalFn(...params), options);
  };
}

/**
 *
 * @param originalFn
 * @param responseObservable
 */
export function withProcessorServiceWrapper<T extends any[], R>(
  originalFn: FunctionWithParams<T, R>,
  responseObservable?: Observable<IResponseQuery<R>>
) {
  return async (...args: [...args: T, options?: IProcessorRequestOptions]) => {
    // 获取下option参数
    const options =
      args.length &&
      (args[args.length - 1] as
        | Omit<IProcessorRequestOptions<any>, 'responseObservable'>
        | undefined);

    let params: any;
    // 判断如果最后一个参数是options，如果参数中有onSuccess或者onError，则是最后一个参数
    if (options && (options?.onSuccess || options?.onError)) {
      params = args.slice(0, args.length - 1) as Parameters<FunctionWithParams<T, R>>;
    } else {
      params = args as unknown as Parameters<FunctionWithParams<T, R>>;
    }

    // 包装generateRequest
    const newOriginalFn = withProcessorRequestWrapper(originalFn);
    // console.log('q=>prams', params);

    // @ts-ignore
    return await newOriginalFn(...params, {
      responseObservable,
      ...options,
    });
  };
}
