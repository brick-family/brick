import { IResponseQuery } from '@brick/core';

import {
  createDataProcessor,
  createTableProcessor,
  DataProcessor,
  TableProcessor,
} from '@brick/processor';
import { EFieldType, IColumnEntity, IColumnRelationConfig, ITableEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { ItemDetailProcessor } from '../../item-detail';

export interface IDataTableFeature {
  /**
   * 是否有详情页面
   */
  hasDetail?: boolean;
  /**
   * 是否有创建按钮
   */
  hasCreate?: boolean;
}

export type TTableColumn = IColumnEntity & {
  hasRelation?: boolean;
  relationColumn?: IColumnEntity;
};

export class DataTableProcessor {
  // table id
  tableId: Observable<string>;

  /**
   * table行选择的数据
   */
  tableSelectData: Observable<ITableEntity[]> = observable([]);

  dataProcessor: DataProcessor;

  tableProcessor: TableProcessor;

  feature: IDataTableFeature;

  /**
   * 详情页processor
   */
  itemDetailProcessor: ItemDetailProcessor | undefined;

  constructor({
    tableId,
    itemDetailProcessor,
    feature,
  }: {
    tableId: string;
    itemDetailProcessor?: ItemDetailProcessor;
    feature: IDataTableFeature;
  }) {
    this.tableId = observable(tableId);
    this.dataProcessor = createDataProcessor().processor;
    this.tableProcessor = createTableProcessor().processor;
    this.itemDetailProcessor = itemDetailProcessor || undefined;
    this.feature = feature;
    this.init(tableId);
  }

  get table(): Observable<IResponseQuery<ITableEntity>> {
    return this.tableProcessor.table;
  }

  /**
   * table列表数据
   */
  get tableData() {
    return this.dataProcessor.queryDataResponse;
  }

  /**
   * 获取tableColumn
   */
  get tableColumns() {
    const columns = this.table.data.columns.peek() || [];
    const resultColumns: Array<TTableColumn> = [];

    for (const item of columns) {
      // 字表
      if (item.fieldType === EFieldType.SUBTABLE) {
        continue;
      }

      resultColumns.push(item);

      // 如果是关联数据
      if (item.fieldType === EFieldType.RELATION) {
        const relationConfig = item.columnConfig as IColumnRelationConfig;

        relationConfig?.displayFields?.forEach((relationColumn) => {
          resultColumns.push({
            ...relationColumn,
            title: `(${item.title})-${relationColumn.title}`,
            hasRelation: true,
            relationColumn: item,
            // relationDbFieldName: item.dbFieldName,
          });
        });
      }
    }

    // TODO 有性能问题，会多次执行
    console.log(
      'q=>resultColumns',
      resultColumns.map((item) => ({ dbFieldName: item.dbFieldName, title: item.title }))
    );
    return resultColumns;
  }

  private requestTable = async () => {
    return this.tableProcessor.getTable({ id: this.tableId.get() });
  };

  private init = async (tableId: string) => {
    // 请求table 数据
    this.requestTable();
    // 设置data请求参数
    this.dataProcessor.setQueryDataParamsObservable((draft) => {
      draft.tableId.set(tableId);
    });
    // await Promise.all([this.requestTable()]);
    this.listeners();
  };

  /**
   * 设置详情页processor
   */
  setItemDetailProcessor(currItemDetailProcessor: ItemDetailProcessor) {
    this.itemDetailProcessor = currItemDetailProcessor;
  }

  /**
   * 刷新数据
   */
  refresh = () => {
    // 刷新data数据
    this.dataProcessor.refresh();
  };

  /**
   * 开启监听器
   */
  listeners = () => {
    this.tableId.onChange(() => {
      this.init(this.tableId.get());
    });
  };
}
