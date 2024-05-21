import { IDeptEntity, TMenuData } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { queryDeptAll, createDept, updateDept, deleteDept } from '@brick/services';
import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { arrayToTree, searchTreeData } from '@brick/utils';

/**
 * 部门Processor
 */
export class DeptProcessor extends BaseProcessor {
  deptListResponse: TObservableResponse<Array<IDeptEntity>>;

  createDeptResponse: TObservableResponse<boolean>;

  updateDeptResponse: TObservableResponse<boolean>;

  deleteDeptResponse: TObservableResponse<boolean>;

  /**
   * 资源tree结构，返回的是antd
   */
  deptTree: Observable<Array<TMenuData<IDeptEntity>>>;

  /**
   * 资源tree结构，内部缓存数据
   * @private
   */
  deptTreeCache: Observable<Array<TMenuData<IDeptEntity>>>;

  /**
   * 搜索tree的关键字
   */
  searchTreeKeyWords: Observable<string>;
  searchTargetKeyWords: Observable<string>;

  constructor() {
    super();
    this.deptListResponse = createDefaultResponseQuery();
    this.createDeptResponse = createDefaultResponseQuery();
    this.updateDeptResponse = createDefaultResponseQuery();
    this.deleteDeptResponse = createDefaultResponseQuery();
    this.deptTree = observable([] as Array<TMenuData<IDeptEntity>>);
    this.deptTreeCache = observable([]);
    this.searchTreeKeyWords = observable('');
    this.searchTargetKeyWords = observable('');
    this.init();
  }

  get queryDeptAll() {
    return withProcessorServiceWrapper(queryDeptAll, this.deptListResponse);
  }

  get createDept() {
    return withProcessorServiceWrapper(createDept, this.createDeptResponse);
  }

  get updateDept() {
    return withProcessorServiceWrapper(updateDept, this.updateDeptResponse);
  }

  get deleteDept() {
    return withProcessorServiceWrapper(deleteDept, this.deleteDeptResponse);
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 更改查询条件
   * @param value
   */
  setSearchTreeKeyWords = (value: string) => {
    this.searchTreeKeyWords.set(value);
  };

  setSearchTargetKeyWords = (value: string) => {
    this.searchTargetKeyWords.set(value);
  };

  setDeptTree = (value: Array<TMenuData<IDeptEntity>>) => {
    this.deptTree.set(value);
    this.deptTreeCache.set(value);
  };

  setDeptTreeCatch = (value: Array<TMenuData<IDeptEntity>>) => {
    this.deptTreeCache.set(value);
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.deptListResponse.data.onChange((changeData) => {
      const newData = changeData.value.map((data) => {
        return { ...data, key: data.id, title: data.name };
      });
      const result = arrayToTree(newData) as any;
      this.deptTree.set(result);
      this.deptTreeCache.set(result);
    });

    //监听搜索关键字
    this.searchTreeKeyWords.onChange((changeData) => {
      const searchResult = searchTreeData(changeData.value, this.deptTreeCache.get());
      this.deptTree.set(searchResult as any);
    });
  };
}

export const createDeptProcessor = () => {
  let processor: null | DeptProcessor = new DeptProcessor();

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
export const deptProcessor = createDeptProcessor().processor;
