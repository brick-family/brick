import {
  BaseProcessor,
  createDefaultResponseQuery,
  generateSetObservable,
  IResponseQuery,
} from '@brick/core';
import {
  createLowcodeEditorPreviewProcessor,
  LowcodeEditorPreviewProcessor,
} from '@brick/lowcode-editor';
import {
  AppProcessor,
  createAppProcessor,
  createResourceProcessor,
  ResourceProcessor,
} from '@brick/processor';
import { ITableEntity } from '@brick/types';
import { batch, observable, Observable } from '@legendapp/state';
import {
  createResourcePagePortalProcessor,
  ResourcePagePortalProcessor,
} from './ResourcePagePortalProcessor';

export class ResourcePageProcessor extends BaseProcessor {
  appList: Observable<IResponseQuery<any>>;

  /**
   * 资源id
   */
  resourceId: Observable<string>;

  /**
   * 应用id
   */
  applicationId: Observable<string>;

  private appProcessor: AppProcessor;

  resourceProcessor: ResourceProcessor;

  /**
   * 预览相关
   */
  previewProcessor: LowcodeEditorPreviewProcessor;

  /**
   * 资源页面portal
   */
  portalProcessor: ResourcePagePortalProcessor;

  constructor() {
    super();
    this.appList = createDefaultResponseQuery();
    this.resourceId = observable('');
    this.applicationId = observable('');

    this.appProcessor = createAppProcessor().processor;
    this.resourceProcessor = createResourceProcessor().processor;
    this.previewProcessor = createLowcodeEditorPreviewProcessor().processor;
    this.portalProcessor = createResourcePagePortalProcessor().processor;

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
    return this.resourceProcessor.getResourceIncludeResourceResponse?.data
      ?.resource as Observable<ITableEntity>;
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
   * 设置资源内容
   */
  get setResourceObserver() {
    return generateSetObservable(this.resourceProcessor.getResourceIncludeResourceResponse.data);
  }

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.resourceId.onChange(async (changeData) => {
      if (changeData.value) {
        // 获取资源内容
        const result = await this.resourceProcessor.getResourceIncludeResource(changeData.value);
        // 设置表格数据

        // console.log('q=>result-resource', result.resource);
        // this.tableData.set(result.resource);
      }
    });

    this.applicationId.onChange(async (changeData) => {
      if (changeData.value) {
        // 获取app内容
        const result = await this.appProcessor.getApplication(changeData.value);
      }
    });
  };

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
}

export const createResourcePageProcessor = () => {
  let processor: null | ResourcePageProcessor = new ResourcePageProcessor();

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
