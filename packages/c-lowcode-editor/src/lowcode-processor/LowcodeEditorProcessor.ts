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
} from '../utils';
import { message } from 'antd';
import { updateTable } from '@brick/services';
import { delBaseEntityAttr } from '@brick/utils';
import {
  createLowcodeEditorPreviewProcessor,
  LowcodeEditorPreviewProcessor,
} from './LowcodeEditorPreviewProcessor';

export class LowcodeEditorProcessor extends BaseProcessor {
  // 表格数据
  resourceData: Observable<IResourceEntityIncludeResource | null>;
  // 页面数据
  pageData: Observable<any>;

  resourceProcessor: ResourceProcessor;

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
    return this.resourceProcessor.getResourceIncludeResourceResponse.data?.resourceType;
  }

  /**
   * 设置资源内容
   */
  get setResourceObserver() {
    return generateSetObservable(this.resourceProcessor.getResourceIncludeResourceResponse.data);
  }

  get schemaData() {
    if (this.resourceType.get() === EResourceType.TABLE) {
      return this.tableData?.schema;
    }
    console.warn('没有匹配到对应的类型');
    return null;
  }

  setSchema = async () => {
    let tableSchema = this.schemaData;
    if (tableSchema) {
      // 默认schema
      project?.importSchema(getSchemaObject(tableSchema));
      project?.simulatorHost?.rerender();
      return;
    }
    const defaultSchema = await getPageSchema();
    // 加载 schema
    project?.openDocument(defaultSchema);
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
    console.log('q=>-save->columns1', columns);
    try {
      if (this.resourceData.get()?.resourceType === 'TABLE') {
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
        this.resourceProcessor.getResourceIncludeResourceResponse?.data?.resource.set(resourceData);
        // this.tableData.set(resourceData);
        // setLowcodeData(resourceData);
        // dataService.lowcodeSetSchema();
        this.setSchema();
      }

      message.success('保存成功');
      // 返回上一级
      // history.go(-1);
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
