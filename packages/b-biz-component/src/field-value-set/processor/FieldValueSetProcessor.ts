import { BaseProcessor } from '@brick/core';
import { IColumnEntity, ITableEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { EFieldValueType, IFieldValue } from '../types';

export class FieldValueSetProcessor extends BaseProcessor {
  tableConfig: Observable<ITableEntity | null>;

  columnsMap: Observable<Record<string, IColumnEntity>>;

  value: Observable<IFieldValue[]>;

  constructor() {
    super();
    this.tableConfig = observable(null);
    this.value = observable([]);
    this.columnsMap = observable({}) as any;
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  setTableConfig = (tableConfig: ITableEntity) => {
    this.tableConfig?.set(tableConfig);
  };

  getDefaultFiledValue = (fieldId: string) => {
    return { fieldId, type: EFieldValueType.value, data: null };
  };

  addField = (fieldId: string) => {
    this.value.push(this.getDefaultFiledValue(fieldId));
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.tableConfig?.onChange((changeValue) => {
      const newTableConfig = changeValue.value;

      const columnMap: any = {};
      newTableConfig?.columns?.forEach((column) => {
        columnMap[column?.id!] = column;
      });
      this.columnsMap?.set(columnMap);
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
