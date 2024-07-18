import { BaseProcessor, generateSetObservable } from '@brick/core';
import { IColumnEntity, ITableEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { EFieldValueType, IFieldValue } from '../types';

export class FieldValueSetProcessor extends BaseProcessor {
  tableConfig: Observable<ITableEntity | null>;

  columnsMap: Observable<Record<string, IColumnEntity>>;

  value: Observable<IFieldValue[]>;

  onValueChange: (value: IFieldValue[]) => void;

  constructor() {
    super();
    this.tableConfig = observable(null);
    this.value = observable([]);
    this.columnsMap = observable({}) as any;
    this.onValueChange = () => {};
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  setTableConfig = (tableConfig: ITableEntity) => {
    this.tableConfig?.set(tableConfig);
  };

  setOnChange = (changeCbk: (value: IFieldValue[]) => void) => {
    this.onValueChange = changeCbk;
  };

  get setValueObservable() {
    return generateSetObservable(this.value!);
  }

  setValue = (newValue: IFieldValue[]) => {
    this.value.set(newValue);
  };

  getDefaultFiledValue = (fieldId: string) => {
    return { fieldId, type: EFieldValueType.value, data: null };
  };

  addField = (fieldId: string) => {
    this.value.push(this.getDefaultFiledValue(fieldId));
  };

  /**
   * 删除某个字段
   * @param fieldId
   */
  removeField = (fieldId: string) => {
    const index = this.value?.get()?.findIndex((f) => {
      return f?.fieldId == fieldId;
    });
    console.log('q=>index', index, fieldId);
    if (index != -1) {
      this.value.splice(index, 1);
    }
  };

  /**
   * 修改某个值
   * @param value
   */
  updateFieldValue = (value: IFieldValue) => {
    const index = this.value?.get()?.findIndex((f) => {
      return f?.fieldId == value.fieldId;
    });

    // 更新具体
    if (index != -1) {
      this.value?.[index]?.set(value);
    }
  };

  /**
   * 过滤value是否存在
   */
  _filterValue = (columnsMap?: Record<string, IColumnEntity>) => {
    const newValue: IFieldValue[] = [];
    const currColumnsMap = columnsMap || this.columnsMap?.get();
    const hasColumns = Object.keys(currColumnsMap)?.length > 0;

    hasColumns &&
      this.value?.get()?.forEach((f) => {
        const filedId = f?.fieldId;
        if (currColumnsMap?.[filedId]) {
          newValue.push(f);
        }
      });

    if (hasColumns) {
      this.setValue(newValue);
    }
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
      this._filterValue();
    });

    this.columnsMap?.onChange((changeValue) => {});

    // 值变更调用外部change函数
    this.value?.onChange((changeValue) => {
      // console.log('q=>value-----_filter-changeValue', changeValue.value);
      this.onValueChange(changeValue.value);
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
