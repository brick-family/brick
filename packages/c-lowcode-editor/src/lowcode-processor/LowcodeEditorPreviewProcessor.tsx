import { BaseProcessor } from '@brick/core';
import { observable, Observable } from '@legendapp/state';

export class LowcodeEditorPreviewProcessor extends BaseProcessor {
  open: Observable<boolean>;
  constructor() {
    super();
    this.open = observable(false);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 设置打开模式
   */

  setOpen = (value: boolean) => {
    this.open.set(value);
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createLowcodeEditorPreviewProcessor = () => {
  let processor: null | LowcodeEditorPreviewProcessor = new LowcodeEditorPreviewProcessor();

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
