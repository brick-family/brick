import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import { IErrorNodeInfo } from '@brick/types';
import { Observable, observable } from '@legendapp/state';

export class NodeProcessor extends BaseProcessor {
  errorNodeData: Observable<IErrorNodeInfo | null>;
  constructor() {
    super();
    this.errorNodeData = observable(null);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};

  /**
   * 清空错误node错误节点信息
   */
  clearErrorNodeData = (id: string) => {
    if (this.errorNodeData.get()?.id === id) {
      this.errorNodeData.set(null);
    }
  };
}

export const createNodeProcessor = () => {
  let processor: null | NodeProcessor = new NodeProcessor();

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
