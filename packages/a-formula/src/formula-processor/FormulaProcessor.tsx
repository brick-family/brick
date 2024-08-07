import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import { Observable } from '@legendapp/state';

export class FormulaProcessor extends BaseProcessor {
  appList: Observable<IResponseQuery<any>>;

  constructor() {
    super();
    this.appList = createDefaultResponseQuery();
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

export const createFormulaProcessor = () => {
  let processor: null | FormulaProcessor = new FormulaProcessor();

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

export const formulaProcessor = createFormulaProcessor().processor;
