import { BaseProcessor } from '@brick/core';
import { createDataProcessor, DataProcessor } from '@brick/processor';

export class DataSelectProcessor extends BaseProcessor {
  dataProcessor: DataProcessor;
  constructor() {
    super();
    this.dataProcessor = createDataProcessor().processor;
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

export const createDataSelectProcessor = () => {
  let processor: null | DataSelectProcessor = new DataSelectProcessor();

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
