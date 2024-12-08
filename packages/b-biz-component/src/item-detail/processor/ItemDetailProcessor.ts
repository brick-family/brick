import { message, Modal } from 'antd';

import { IResponseQuery } from '@brick/core';

import { DataTableProcessor } from '@brick/biz-component';
import { IPreviewRef } from '@brick/lowcode-editor';
import {
  createDataProcessor,
  createProcessProcessor,
  createTableProcessor,
  DataProcessor,
  ProcessProcessor,
  TableProcessor,
} from '@brick/processor';
import { ITableEntity } from '@brick/types';
import { batch, Observable, observable } from '@legendapp/state';
import { convertFormValuesToItemData, getFormValues, getItemId } from '../utils';
import { EMode, EOpenType, IOpenProps, TMode, TOpenType } from './types';

export class ItemDetailProcessor {
  /**
   * table id
   */
  tableId: Observable<string>;

  /**
   * item id
   */
  itemId: Observable<string>;

  /**
   * 当前item模式
   */
  mode: Observable<TMode>;

  /**
   * 打开方式
   */
  openType: Observable<TOpenType>;

  /**
   * 打开方式的prop，modal或drawer
   */
  openProps: Observable<IOpenProps>;

  /**
   * 数据处理器
   */
  dataProcessor: DataProcessor;

  /**
   * 流程处理器
   */
  processProcessor: ProcessProcessor;

  /**
   * 当前data table数据处理器
   */
  dataTableProcessor: Observable<DataTableProcessor>;

  /**
   * 挡墙form实例
   */
  formRef: React.MutableRefObject<IPreviewRef> | null;

  tableProcessor: TableProcessor;

  constructor() {
    this.openType = observable(EOpenType.modal);
    this.mode = observable(EMode.create);
    this.tableId = observable('');
    this.itemId = observable('');
    this.openProps = observable({ open: false });
    this.dataTableProcessor = observable();
    this.dataProcessor = createDataProcessor().processor;
    this.processProcessor = createProcessProcessor().processor;
    this.tableProcessor = createTableProcessor().processor;

    // window._openType = this.openType;
    // window.is = isObservable;
    this.formRef = null;
    this.listeners();
  }

  get table(): Observable<IResponseQuery<ITableEntity>> {
    return this.tableProcessor.table;
  }

  /**
   * 当前item data数据
   */
  get itemData() {
    return this.dataProcessor.getDataResponse;
  }

  /**
   * 获取默认值数据
   */
  get defaultItemDate() {
    return this.tableProcessor.getTableDefaultValueResponse;
  }

  /**
   * 当前item data数据loading
   */
  get submitLoading() {
    return (
      this.dataProcessor.createDataResponse.loading || this.dataProcessor.updateDataResponse.loading
    );
  }

  /**
   * 提交流程loading
   */
  get submitProcessLoading() {
    return this.processProcessor.startProcessResponse.loading;
  }

  private requestTable = async () => {
    return this.tableProcessor.getTable({ id: this.tableId.get() });
  };

  private getData = async () => {
    const itemId = this.itemId.peek();
    if (!itemId) {
      return;
    }
    const params = { tableId: this.tableId.peek(), id: this.itemId.peek() };
    return this.dataProcessor.getData(params);
  };

  private listeners = () => {
    this.tableId.onChange((changeData) => {
      console.log('q=>requestTable');
      this.requestTable();
      if (this.mode.peek() === EMode.create) {
        this.tableProcessor.getTableDefaultValue(changeData.value);
      }
    });

    this.itemId.onChange(() => {
      this.getData();
    });

    // 模式的变更
    this.mode.onChange((changeData) => {});
  };

  /**
   * 删除数据
   */
  deleteData = async () => {
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          const params = { tableId: this.tableId.peek(), id: this.itemId.peek() };
          await this.dataProcessor.deleteData(params);
          this.close();
          // 刷新列表
          this.dataTableProcessor?.refresh?.();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  };

  /**
   * 上一条数据
   */
  prevData = async () => {
    const dataList = this.dataTableProcessor?.tableData?.data?.peek?.()?.records;
    const { itemId, isFirst } = getItemId(this.itemId.peek(), dataList);
    if (isFirst) {
      message.warning('已是第一条了！');
    }
    this.itemId.set(itemId);
  };

  /**
   * 下一条数据
   */
  nextData = async () => {
    const dataList = this.dataTableProcessor?.tableData?.data?.peek?.()?.records;
    const { itemId, isEnd } = getItemId(this.itemId.peek(), dataList, 'next');
    if (isEnd) {
      message.warning('已是最后一条了！');
    }
    this.itemId.set(itemId);
  };

  /**
   * 复制数据
   */
  copyData = async () => {
    this.mode.set(EMode.create);
    const formInstance = await this.formRef?.current?.getFormInstance();
    formInstance?.setFieldsValue(this.itemData.peek());
  };

  /**
   * 分享
   */
  share = async () => {
    message.info('敬请期待～');
  };

  /**
   * 打印
   */
  print = async () => {
    message.info('敬请期待～');
  };

  /**
   * 获取form data数据
   * @returns
   */
  private getFormData = async () => {
    const formValues = await getFormValues(this.formRef!);
    console.log('q=>mode->formValues', formValues);
    const formData = convertFormValuesToItemData(formValues, this.table.peek().data.columns);
    return formData;
  };

  /**
   * 保存流程数据
   * @param options
   */
  saveProcessData = async (options: { isRefreshTableList: boolean }) => {
    const formData = await this.getFormData();
    const currItem = this.itemData?.peek?.()?.data;
    const params = {
      tableId: this.tableId.peek(),
      data: this.mode.peek() === EMode.create ? formData : { id: currItem?.id, ...formData },
    };
    const currMode = this.mode.peek();
    if (currMode === EMode.create) {
      await this.processProcessor.startProcess(params);
    } else {
      // TODO
    }

    if (options?.isRefreshTableList) {
      this.dataTableProcessor?.refresh?.();
    }
  };

  /**
   * 保存或者更新数据
   */
  saveData = async (options: { isRefreshTableList: boolean }) => {
    const formData = await this.getFormData();
    const currItem = this.itemData?.peek?.()?.data;
    const params = {
      tableId: this.tableId.peek(),
      data: this.mode.peek() === EMode.create ? formData : { id: currItem?.id, ...formData },
    };
    if (this.mode.peek() === EMode.create) {
      await this.dataProcessor.createData(params);
    } else {
      await this.dataProcessor.updateData(params);
    }

    if (options?.isRefreshTableList) {
      this.dataTableProcessor?.refresh?.();
    }
  };

  /**
   * 绑定formRef
   * @param formRef
   */
  bindFormRef = (formRef: React.MutableRefObject<IPreviewRef>) => {
    this.formRef = formRef;
  };

  open = (params: { openType: TOpenType; mode: TMode; tableId: string; itemId?: string }) => {
    batch(() => {
      this.openType.set(params.openType);
      this.mode.set(params.mode);
      this.tableId.set(params.tableId);
      this.openProps.open.set(true);
      if (params.itemId) {
        this.itemId.set(params.itemId);
      }
    });
  };

  /**
   * 变更当前的模式
   * @param mode
   */
  changeMode = (mode: TMode) => {
    this.mode.set(mode);
  };

  /**
   * 弹框关闭
   */
  close = () => {
    // 清空item id
    this.itemId.set(null);
    this.openProps.open.set(false);
  };

  /**
   * 设置dataTable处理器
   * @param dataTableProcessor
   */
  setDataTableProcessor = (dataTableProcessor: DataTableProcessor) => {
    this.dataTableProcessor.set(dataTableProcessor);
  };
}

export const createItemDetailProcessor = () => {
  let processor: null | ItemDetailProcessor = new ItemDetailProcessor();

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

// export const itemDetailProcessor = createItemDetailProcessor().processor;

export const itemDetailProcessor = new ItemDetailProcessor();
