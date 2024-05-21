import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';

import {
  createResource,
  getResource,
  getResourceIncludeResource,
  queryResourceAll,
  queryResourceByResourceType,
  updateResource,
} from '@brick/services';
import {
  IResourceEntity,
  IResourceEntityIncludeResource,
  IResourceListVo,
  TMenuData,
} from '@brick/types';
import { convertResourceToMenu, searchTreeData } from '@brick/utils';
import { Observable, observable } from '@legendapp/state';

export class ResourceProcessor extends BaseProcessor {
  /**
   * 资源项
   */
  resources: Observable<IResponseQuery<IResourceListVo>>;

  /**
   * 根据类型获取的资源项
   */
  resourcesByType: TObservableResponse<Array<IResourceEntity>>;

  /**
   * 资源tree结构，返回的是antd
   */
  resourcesTree: Observable<Array<TMenuData<IResourceEntity>>>;

  /**
   * 获取当个资源，包含具体的实体
   */
  getResourceIncludeResourceResponse: TObservableResponse<IResourceEntityIncludeResource>;

  /**
   * 获取单个资源
   */
  getResourceResponse: TObservableResponse<IResourceEntity>;

  updateResourceResponse: TObservableResponse<IResourceEntity>;

  /**
   * 资源tree结构，内部缓存数据
   * @private
   */
  private resourcesTreeCache: Observable<Array<TMenuData<IResourceEntity>>>;

  /**
   * 搜索tree的关键字
   */
  searchTreeKeyWords: Observable<string>;

  createResourceResponse: Observable<IResponseQuery<IResourceEntity>>;
  constructor() {
    super();
    this.resources = createDefaultResponseQuery();
    this.createResourceResponse = createDefaultResponseQuery();
    this.getResourceIncludeResourceResponse = createDefaultResponseQuery();
    this.getResourceResponse = createDefaultResponseQuery();
    this.updateResourceResponse = createDefaultResponseQuery();
    this.resourcesTree = observable([]);
    this.resourcesTreeCache = observable([]);
    this.searchTreeKeyWords = observable('');
    this.resourcesByType = createDefaultResponseQuery();

    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    // 监听资源的变更
    this.resources.data.onChange((resourceList) => {
      if (resourceList.value) {
        const menus = convertResourceToMenu(resourceList.value) as any;
        this.resourcesTree.set(menus);
        this.resourcesTreeCache.set(menus);
      }
    });

    //监听搜索关键字
    this.searchTreeKeyWords.onChange((changeData) => {
      const searchResult = searchTreeData(changeData.value, this.resourcesTreeCache.get());
      console.log('q=>search', this.resourcesTreeCache.get());
      this.resourcesTree.set(searchResult as any);
    });
  };

  /**
   * 获取所有resource
   */
  get requestResourceAll() {
    return withProcessorServiceWrapper(queryResourceAll, this.resources);
  }

  /**
   * 根据类型获取资源
   */
  get requestResourceAllByResourceType() {
    return withProcessorServiceWrapper(queryResourceByResourceType, this.resourcesByType);
  }

  /**
   * 创建资源
   * @param resourceType
   */
  get createResource() {
    return withProcessorServiceWrapper(createResource, this.createResourceResponse);
  }

  /**
   * 获取资源的返回包含具体的资源
   */
  get getResourceIncludeResource() {
    return withProcessorServiceWrapper(
      getResourceIncludeResource,
      this.getResourceIncludeResourceResponse
    );
  }

  get updateResource() {
    return withProcessorServiceWrapper(updateResource, this.updateResourceResponse);
  }

  /**
   * 获取单个资源
   */
  get getResource() {
    return withProcessorServiceWrapper(getResource, this.getResourceResponse);
  }

  setSearchTreeKeyWords = (value: string) => {
    this.searchTreeKeyWords.set(value);
  };

  /**
   * 刷新数据
   */
  refresh = () => {
    this.requestResourceAll();
  };
}

export const createResourceProcessor = () => {
  let processor: null | ResourceProcessor = new ResourceProcessor();

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

/**
 * 导出当前Processor
 */
export const resourceProcessor = createResourceProcessor().processor;
