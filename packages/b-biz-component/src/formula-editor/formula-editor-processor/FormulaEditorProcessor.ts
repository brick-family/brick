import { BaseProcessor } from '@brick/core';
import { createModalProcessor, ModalProcessor } from '@brick/processor';

export class FormulaEditorProcessor extends BaseProcessor {
  modelProcessor: ModalProcessor;
  constructor() {
    super();
    this.modelProcessor = createModalProcessor().processor;
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

export const createFormulaEditorProcessor = () => {
  let processor: null | FormulaEditorProcessor = new FormulaEditorProcessor();

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
