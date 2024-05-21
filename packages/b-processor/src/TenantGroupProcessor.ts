import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { ITenantGroupEntity, ITenantGroupUserAppVo } from '@brick/types';
import {
  bindTenantGroup,
  createTenantGroup,
  deleteTenantGroup,
  getAll,
  getTenantGroupUserApp,
  updateTenantGroup,
} from '@brick/services';
import { batch, observable, Observable } from '@legendapp/state';

export class TenantGroupProcessor extends BaseProcessor {
  tenantGroupListResponse: TObservableResponse<Array<ITenantGroupEntity>>;

  // 管理组（不包含系统管理组）
  tenantGroupListNoSystem: Observable<Array<ITenantGroupEntity>>;

  // 系统管理组
  systemTenantGroup: Observable<ITenantGroupEntity | null>;

  deleteTenantGroupResponse: TObservableResponse<boolean>;
  createTenantGroupResponse: TObservableResponse<boolean>;
  updateTenantGroupResponse: TObservableResponse<boolean>;
  bindTenantGroupResponse: TObservableResponse<boolean>;
  getTenantGroupUserAppResponse: TObservableResponse<ITenantGroupUserAppVo>;

  constructor() {
    super();
    this.tenantGroupListResponse = createDefaultResponseQuery();
    this.deleteTenantGroupResponse = createDefaultResponseQuery();
    this.createTenantGroupResponse = createDefaultResponseQuery();
    this.updateTenantGroupResponse = createDefaultResponseQuery();
    this.bindTenantGroupResponse = createDefaultResponseQuery();
    this.getTenantGroupUserAppResponse = createDefaultResponseQuery();
    this.systemTenantGroup = observable(null);
    this.tenantGroupListNoSystem = observable([]);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {
    this.tenantGroupListResponse.onChange((changeData) => {
      const data = changeData.value.data;

      const systemGroup = data?.find((f) => f.isSystem === 1);

      batch(() => {
        this.systemTenantGroup.set(systemGroup);
        this.tenantGroupListNoSystem.set(data?.filter((f) => f.isSystem !== 1));
      });
    });
  };

  get getAll() {
    return withProcessorServiceWrapper(getAll, this.tenantGroupListResponse);
  }

  get deleteTenantGroup() {
    return withProcessorServiceWrapper(deleteTenantGroup, this.deleteTenantGroupResponse);
  }

  get createTenantGroup() {
    return withProcessorServiceWrapper(createTenantGroup, this.createTenantGroupResponse);
  }

  get updateTenantGroup() {
    return withProcessorServiceWrapper(updateTenantGroup, this.updateTenantGroupResponse);
  }

  get bindTenantGroup() {
    return withProcessorServiceWrapper(bindTenantGroup, this.bindTenantGroupResponse);
  }

  get getTenantGroupUserApp() {
    return withProcessorServiceWrapper(getTenantGroupUserApp, this.getTenantGroupUserAppResponse);
  }
}

export const createTenantGroupProcessor = () => {
  let processor: null | TenantGroupProcessor = new TenantGroupProcessor();

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

export const tenantGroupProcessor = createTenantGroupProcessor().processor;
