import { v4 as uuidV4 } from 'uuid';

type PromiseWrapper<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

/**
 * 创建一个promise， 返回 resolve ，reject 和 执行执行函数的promise
 */
export function createPromiseWrapper<T>(): PromiseWrapper<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/**
 *生成一个uuid
 * @returns uuid
 */
export const uuid = () => {
  return uuidV4();
};
