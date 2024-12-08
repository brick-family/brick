import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { startProcess } from '@brick/services';
import { Observable } from '@legendapp/state';

export class ProcessProcessor extends BaseProcessor {
  startProcessResponse: TObservableResponse<boolean>;
  constructor() {
    super();
    this.startProcessResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  get startProcess() {
    return withProcessorServiceWrapper(startProcess, this.startProcessResponse);
  }
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createProcessProcessor = () => {
  let processor: null | ProcessProcessor = new ProcessProcessor();

  const getRoot = () => {
    return processor;
  };
  const destroy = () => {
    processor = null;
  };

  return {
    processor,
    getRoot,
    destroy,
  };
};
