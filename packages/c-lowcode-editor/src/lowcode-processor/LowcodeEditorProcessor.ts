import { resourceProcessor, ResourceProcessor } from '@brick/processor';
import { EResourceType, IResourceEntityIncludeResource, ITableEntity } from '@brick/types';
import { BaseProcessor, generateSetObservable } from '@brick/core';
import { batch, observable, Observable } from '@legendapp/state';
import { project } from '@alilc/lowcode-engine';
import {
  getColumnDataBySchema,
  getPageSchema,
  getSchema,
  getSchemaObject,
  getSchemaString,
  updateSchema,
} from '../utils';
import { message } from 'antd';
import { updateTable } from '@brick/services';
import { delBaseEntityAttr, isTableResourceByType } from '@brick/utils';
import {
  createLowcodeEditorPreviewProcessor,
  LowcodeEditorPreviewProcessor,
} from './LowcodeEditorPreviewProcessor';
import { defaultSchema } from '../services/defaultSchema';

export class LowcodeEditorProcessor extends BaseProcessor {
  // 表格数据
  resourceData: Observable<IResourceEntityIncludeResource | null>;
  // 页面数据
  pageData: Observable<any>;

  private resourceProcessor: ResourceProcessor;

  /**
   * 预览相关
   */
  previewProcessor: LowcodeEditorPreviewProcessor;

  constructor() {
    super();

    this.resourceData = observable(null);
    this.pageData = observable();
    this.resourceProcessor = resourceProcessor;
    this.previewProcessor = createLowcodeEditorPreviewProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  get tableData() {
    return this.resourceData.get()?.resource;
  }

  setResourceData = (data: IResourceEntityIncludeResource) => {
    this.resourceData.set(data);
  };

  /**
   * 返回资源类型
   */
  get resourceType() {
    return this.resourceData.get()?.resourceType;
  }

  /**
   * 设置资源内容
   */
  get setResourceObserver() {
    return generateSetObservable(this.resourceProcessor.getResourceIncludeResourceResponse.data);
  }

  get schemaData() {
    if (isTableResourceByType(this.resourceType!)) {
      return this.tableData?.schema;
    }
    return null;
  }

  setSchema = async () => {
    let tableSchema = this.schemaData;
    if (tableSchema) {
      updateSchema(getSchemaObject(tableSchema));
      return;
    }
    updateSchema(defaultSchema as any);
  };

  saveSchema = async () => {
    const schema = getSchema();
    const { componentsTree } = schema;

    // @ts-ignore
    const formContainerScheme = componentsTree?.[0]?.children?.[0];
    const pageScheme = formContainerScheme?.children;
    if (!pageScheme) {
      message.info('设计器中没有组件！');
      return;
    }

    const currTableData = this.tableData;
    const columns = getColumnDataBySchema(pageScheme, currTableData?.columns!);
    // console.log('q=>saveSchema', this.resourceType, this.resourceData);
    try {
      if (isTableResourceByType(this.resourceType!)) {
        const currTable = currTableData;
        const newTableData: ITableEntity = {
          ...currTable,
          id: currTable?.id,
          // title: currTable?.title!,
          // resourceType: currTable?.resourceType!,
          columns,
          schema: getSchemaString(schema),
        };
        delBaseEntityAttr(newTableData);

        const resourceData = await updateTable(newTableData);
        this.resourceData.set({ ...this.resourceData.get()!, resource: resourceData });
        this.setSchema();
      }

      message.success('保存成功');
    } catch (error) {
      message.error('Error saving schema');
    }
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createLowcodeEditorProcessor = () => {
  let processor: null | LowcodeEditorProcessor = new LowcodeEditorProcessor();

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

export const lowcodeEditorProcessor = createLowcodeEditorProcessor()?.processor;

/**
 * 获取低代码编辑器处理器
 */
export const getLp = () => {
  return lowcodeEditorProcessor;
};
