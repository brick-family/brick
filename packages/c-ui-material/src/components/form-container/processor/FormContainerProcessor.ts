import { BaseProcessor } from '@brick/core';
import { observable, Observable } from '@legendapp/state';

export interface FormContainerProcessorConstructor {}

export class FormContainerProcessor extends BaseProcessor {
  readonly: Observable<boolean>;
  isMobile: Observable<boolean>;
  constructor() {
    super();
    this.readonly = observable(false);
    this.isMobile = observable(false);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  changeReadonly = (currReadonly: boolean) => {
    this.readonly.set(currReadonly);
  };

  setMobile = (currH5: boolean) => {
    this.isMobile.set(currH5);
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createFormContainerProcessor = () => {
  let processor: null | FormContainerProcessor = new FormContainerProcessor();

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
