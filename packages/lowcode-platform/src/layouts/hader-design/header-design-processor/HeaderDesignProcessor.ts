import { AppProcessor, createAppProcessor } from '@brick/processor';
import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import { Observable } from '@legendapp/state';

export class HeaderDesignProcessor extends BaseProcessor {
  appProcessor: AppProcessor;
  constructor() {
    super();
    this.appProcessor = createAppProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createHeaderDesignProcessor = () => {
  let processor: null | HeaderDesignProcessor = new HeaderDesignProcessor();

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
