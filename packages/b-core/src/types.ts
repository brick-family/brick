import { Observable, ObservableArray } from '@legendapp/state';
import { BaseProcessor } from './utils';

/**
 * data processor 请求接口返回的类型
 */
export interface IResponseQuery<T extends any = any> {
  loading: boolean;
  data: T;
  error?: any;
}

/**
 * Observable返回类型
 */
export type TObservableResponse<T> = Observable<IResponseQuery<T>>;
export interface IProcessorRequestOptions<T extends any = any> {
  responseObservable?: Observable<IResponseQuery<T>>;

  onSuccess?: (data: T) => void;

  onError?: (error: any) => void;
}

/**
 * Observable React Portal类型
 */
export type TObservablePortal<
  T extends React.FunctionComponent<any> = React.FunctionComponent<{ children: React.ReactNode }>
> = Observable<{
  _update_key?: number;
  Portal: T;
}>;
// Observable<{ Portal: React.FunctionComponent<{ children: React.ReactNode }> }>

// type MyAwaited<T extends ObservableObject<unknown>> = T extends ObservableObject<infer X> ? X : never;

// export type TSelector<S extends any, R extends any> = ((s: S) => R extends Array<any> ? Array<string> : R);

// // [P in keyof T]: Observable extends T[P] ? string : T[P] extends ObservableObject ? "string" : T[P];

// type B = (typeof ItemDetailProcessor.prototype);

// type ClassType<T extends any> = typeof T

/**
 * 去除属性为 observable类型转换为具体的类型
 */
// export type WipeObservable<T extends any> = {
//   [P in keyof T]: T[P] extends Observable<infer U> ? U : T[P];
// };

/**
 * 去除属性为 observable类型转换为具体的类型. 这里有递归处理
 */

//  移除数组中的undefined
//  解决这个类型的问题 Observable<Array<TMenuData<IDeptEntity>>>;
type ExcludeArrayUndefined<T> = T extends Array<infer F> ? Array<Exclude<F, undefined>> : T;

export type WipeObservable2<T> = {
  [P in keyof T]: T[P] extends Observable<infer U> ? ExcludeArrayUndefined<U> : T[P];
};

export type WipeObservable<T> = {
  [P in keyof T]: T[P] extends Observable<infer U>
    ? ExcludeArrayUndefined<U>
    : T[P] extends ObservableArray<infer UP> // 如有不兼容的类型，可以在这里扩充
    ? UP
    : T[P] extends (...args: any[]) => any
    ? T[P]
    : T[P] extends BaseProcessor
    ? WipeObservable2<T[P]>
    : T[P];
};
