import { BaseProcessor } from '@brick/core';
import React from 'react';
import ReactDOM from 'react-dom';

export class ResourcePagePortalProcessor extends BaseProcessor {
  /**
   * 顶部操作栏ref
   */
  topBarRightRef: React.RefObject<HTMLDivElement> | null;

  /**
   * 顶部操作栏Portal
   */
  OperationRightPortal: React.FunctionComponent<{ children: React.ReactNode }>;

  constructor() {
    super();
    this.topBarRightRef = null;
    this.OperationRightPortal = () => React.createElement(React.Fragment);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  setTopBarRightRef = (ref: React.RefObject<HTMLDivElement>) => {
    this.topBarRightRef = ref;
    this.OperationRightPortal = ({ children }: any) =>
      ReactDOM.createPortal(children, ref?.current!);
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
