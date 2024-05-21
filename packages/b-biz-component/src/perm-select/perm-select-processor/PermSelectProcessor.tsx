import { createDefaultResponseQuery, generateSetObservable, IResponseQuery } from '@brick/core';

import { createTableProcessor, TableProcessor } from '@brick/processor';
import { IResourceEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { IPermSelectData } from '../types';

export class PermSelectProcessor {
  appList: Observable<IResponseQuery<any>>;
  data: Observable<IPermSelectData>;
  // 当前选中的资源
  resourceEntity: IResourceEntity | undefined;

  tableProcessor: TableProcessor;
  constructor() {
    this.appList = createDefaultResponseQuery();
    // 初始化data值
    this.data = observable({
      operateCode: [],
      dataCodeIds: [],
      fieldPerm: {
        viewFiledIds: [],
        editFiledIds: [],
      },
    });
    this.tableProcessor = createTableProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  public setData = (d: IPermSelectData) => {
    this.data.set(d);
  };

  get table() {
    return this.tableProcessor.table.data;
  }

  /**
   * 设置data observable
   */
  get setDataObservable() {
    return generateSetObservable(this.data);
  }

  public setResourceEntity = (r: IResourceEntity) => {
    this.resourceEntity = r;
  };

  public getTable = async () => {
    const tableId = this.tableProcessor?.table?.data?.id?.peek?.();
    if (this.resourceEntity?.id && tableId !== this.resourceEntity?.id) {
      return this.tableProcessor.getTable({ id: this.resourceEntity?.id! });
    }
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createPermSelectProcessor = () => {
  let processor: null | PermSelectProcessor = new PermSelectProcessor();

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
