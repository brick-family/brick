import {
  BaseProcessor,
  generateSetObservable,
  TObservablePortal,
  createDefaultObservablePortal,
  setObservablePortal,
} from '@brick/core';
import { Observable, observable } from '@legendapp/state';
import React from 'react';
import ReactDOM from 'react-dom';

export class ResourcePagePortalProcessor extends BaseProcessor {
  /**
   * 顶部操作栏ref
   */
  topBarRightRef: Observable<React.RefObject<HTMLDivElement> | null>;

  /**
   * 顶部操作栏Portal
   */
  OperationRightPortal: TObservablePortal;
  constructor() {
    super();
    this.topBarRightRef = observable(null);
    this.OperationRightPortal = createDefaultObservablePortal();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  setTopBarRightRef = (ref: React.RefObject<HTMLDivElement>) => {
    this.topBarRightRef.set(ref);

    // 设置顶部操作栏Portal
    setObservablePortal({
      dataObservable: this.OperationRightPortal,
      portalFunction: ({ children }: any) => {
        return ReactDOM.createPortal(children, ref?.current!);
      },
    });
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createResourcePagePortalProcessor = () => {
  let processor: null | ResourcePagePortalProcessor = new ResourcePagePortalProcessor();

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
