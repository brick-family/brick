import { AppProcessor, appProcessor, resourceProcessor, ResourceProcessor } from '@brick/processor';
import { EResourceType, ITableEntity } from '@brick/types';
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
  /**
   * 资源id
   */
  resourceId: Observable<string>;

  /**
   * 应用id
   */
  applicationId: Observable<string>;

  // 表格数据
  // tableData: Observable<ITableEntity | null>;
  // 页面数据
  pageData: Observable<any>;

  appProcessor: AppProcessor;

  resourceProcessor: ResourceProcessor;

  /**
   * 预览相关
   */
  previewProcessor: LowcodeEditorPreviewProcessor;

  constructor() {
    super();
    this.resourceId = observable('');
    this.applicationId = observable('');
    // this.tableData = observable(null);
    this.pageData = observable();
    this.appProcessor = appProcessor;
    this.resourceProcessor = resourceProcessor;
    this.previewProcessor = createLowcodeEditorPreviewProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  get appData() {
    return this.appProcessor.getApplicationResponse.data;
  }

  get resourceData() {
    return this.resourceProcessor.getResourceIncludeResourceResponse.data;
  }

  get tableData() {
    return this.resourceProcessor.getResourceIncludeResourceResponse?.data?.resource;
  }
  /**
   * 是否显示loading
   */
  get loading() {
    return (
      this.appProcessor.getApplicationResponse.loading ||
      this.resourceProcessor.getResourceIncludeResourceResponse.loading
    );
  }

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

  /**
   * 设置id
   * @param appId
   * @param resourceId
   */
  setId = (appId: string, resourceId: string) => {
    batch(() => {
      this.resourceId.set(resourceId);
      this.applicationId.set(appId);
    });
  };

  get schemaData() {
    if (this.resourceType.get() === EResourceType.TABLE) {
      return this.tableData.get()?.schema;
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

    const currTableData = this.tableData.peek();
    const columns = getColumnDataBySchema(pageScheme, currTableData?.columns!);
    console.log('q=>-save->columns1', columns);
    try {
      if (this.resourceData.resourceType.peek() === 'TABLE') {
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
  private listeners = () => {
    this.resourceId.onChange(async (changeData) => {
      if (changeData.value) {
        // 获取资源内容
        const result = await this.resourceProcessor.getResourceIncludeResource(changeData.value);
        // 设置表格数据

        if (result.resourceType === EResourceType.TABLE) {
          console.log('q=>result-resource', result.resource);
          this.tableData.set(result.resource);
        }
      }
    });

    this.applicationId.onChange(async (changeData) => {
      if (changeData.value) {
        // 获取app内容
        const result = await this.appProcessor.getApplication(changeData.value);
      }
    });
  };
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
