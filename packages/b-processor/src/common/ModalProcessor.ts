import { observable, Observable } from '@legendapp/state';
import { IModalData } from '@brick/types';
import { BaseProcessor, generateSetObservable } from '@brick/core';

export class ModalProcessor<T extends any = any> extends BaseProcessor {
  modalData: Observable<IModalData<T>>;
  constructor() {
    super();
    this.modalData = observable<IModalData<T>>({
      type: 'create',
      data: null as any,
      open: false,
    });
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 设置modal data数据
   * @param modalData
   */
  setModalData = (modalData: IModalData) => {
    this.modalData.set(modalData);
  };

  /**
   * 通过Observable的方式设置数据
   */
  get setModalDataObservable() {
    return generateSetObservable(this.modalData);
  }

  /**
   * 设置modal创建数据
   * @param modalData
   */
  setCreateModalData = (modalData?: IModalData<T>) => {
    this.setModalData({ type: 'create', open: true, data: {}, ...modalData });
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createModalProcessor = () => {
  let processor: null | ModalProcessor = new ModalProcessor();

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
