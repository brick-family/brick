import { batch } from '@legendapp/state';
import { IProcessorRequestOptions } from '../types';

export const generateRequest = async <T extends any = any>(
  requestFunc: () => Promise<T>,
  options?: IProcessorRequestOptions
) => {
  const { responseObservable, onSuccess, onError } = options || {};

  responseObservable?.loading.set(true);
  try {
    const data = await requestFunc();
    batch(() => {
      responseObservable?.loading.set(false);
      responseObservable?.data.set(data as any);
    });
    onSuccess?.(data);
    return data as T;
  } catch (error) {
    onError?.(error);
    console.log('q=>error', error);
    responseObservable?.loading.set(false);
    responseObservable?.error.set(error);
    throw error;
  }
};
