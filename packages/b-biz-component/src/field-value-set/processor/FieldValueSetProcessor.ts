import { BaseProcessor, createDefaultResponseQuery, IResponseQuery } from '@brick/core';
import { IColumnEntity, ITableEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { IFieldValue } from '../types';

export class FieldValueSetProcessor extends BaseProcessor {
  tableConfig: Observable<ITableEntity | null>;

  columnsMap: Observable<Record<string, IColumnEntity>>;

  value: Observable<IFieldValue[] | null>;
  constructor() {
    super();
    this.tableConfig = observable(null);
    this.value = observable(null);
    this.columnsMap = observable({}) as any;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  setTableConfig = (tableConfig: ITableEntity) => {
    this.tableConfig?.set(tableConfig);
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.tableConfig?.onChange((changeValue) => {
      const newTableConfig = changeValue.value;

      newTableConfig?.columns?.forEach((column) => {});
    });
  };
}

export const createFieldValueSetProcessor = () => {
  let processor: null | FieldValueSetProcessor = new FieldValueSetProcessor();

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
