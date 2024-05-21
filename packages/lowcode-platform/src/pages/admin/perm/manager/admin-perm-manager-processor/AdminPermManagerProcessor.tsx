import { observable, Observable } from '@legendapp/state';
import {
  createModalProcessor,
  ModalProcessor,
  tenantGroupProcessor,
  TenantGroupProcessor,
} from '@brick/processor';
import { ITenantGroupEntity } from '@brick/types';
import { BaseProcessor } from '@brick/core';

export class AdminPermManagerProcessor extends BaseProcessor {
  currTenantGroup: Observable<ITenantGroupEntity | null>;
  tenantGroupProcessor: TenantGroupProcessor;

  modalProcessor: ModalProcessor<ITenantGroupEntity>;

  constructor() {
    super();
    this.tenantGroupProcessor = tenantGroupProcessor;
    this.currTenantGroup = observable(null);
    this.modalProcessor = createModalProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 设置当情选中的租户组
   * @param tenantGroup
   */
  setCurrTenantGroup = (tenantGroup: ITenantGroupEntity) => {
    this.currTenantGroup.set(tenantGroup);
  };

  /**
   * 设置当前系统租户组
   */
  setCurrSystemTenantGroup = () => {
    this.setCurrTenantGroup(this.tenantGroupProcessor.systemTenantGroup.peek()!);
  };

  /**
   * 保存和修改租户租
   */
  saveModalTenantGroup = async (tenantGroup: ITenantGroupEntity) => {
    const type = this.modalProcessor?.modalData?.get?.()?.type;
    let request = this.tenantGroupProcessor.createTenantGroup;
    if (type === 'rename') {
      request = this.tenantGroupProcessor.updateTenantGroup;
    }
    console.log('q=>update-data-111', tenantGroup);
    return request(tenantGroup);
  };

  // 刷新
  refreshTenantGroupUserApp = async () => {
    const id = this.currTenantGroup.peek()?.id;
    await this.tenantGroupProcessor.getTenantGroupUserApp(id!);
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    // 监听系统租户组的变化
    this.tenantGroupProcessor.systemTenantGroup.onChange((changeData) => {
      if (changeData.value) {
        this.setCurrTenantGroup(changeData.value);
      }
    });

    // 监听当前选中的租户组变更
    this.currTenantGroup.onChange(
      (changeData) => {
        console.log('q=>changeData', changeData, changeData.getPrevious()?.id);
        if (changeData.value) {
          this.refreshTenantGroupUserApp();
        }
      },
      {
        // trackingType: 'shallow',
      }
    );
  };
}

export const createAdminPermManagerProcessor = () => {
  let processor: null | AdminPermManagerProcessor = new AdminPermManagerProcessor();

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

export const adminPermManagerProcessor = createAdminPermManagerProcessor().processor;
