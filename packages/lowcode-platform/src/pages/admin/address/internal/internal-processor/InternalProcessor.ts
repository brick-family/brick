import {
  createModalProcessor,
  createUserProcessor,
  deptProcessor,
  DeptProcessor,
  ModalProcessor,
  RoleProcessor,
  roleProcessor,
  UserProcessor,
} from '@brick/processor';
import { arrayToTree } from '@brick/utils';
import { Observable, observable } from '@legendapp/state';
import { TransferItem } from 'antd/es/transfer';
import { DataNode } from 'antd/es/tree';
import { IDeptEntity, IRoleEntity, ITenantGroupEntity } from '@brick/types';

export class InternalProcessor {
  roleProcessor: RoleProcessor;
  deptProcessor: DeptProcessor;
  userProcessor: UserProcessor;
  deptTreeList: Observable<Array<DataNode | TransferItem>>;
  modalProcessor: ModalProcessor<ITenantGroupEntity>;

  selectData: Observable<{ id: string; name: string }>;

  constructor() {
    this.roleProcessor = roleProcessor;
    this.deptProcessor = deptProcessor;
    this.userProcessor = createUserProcessor().processor;
    this.deptTreeList = observable([]);
    this.selectData = observable({ id: '1', name: '全部成员' });
    this.modalProcessor = createModalProcessor().processor;
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.deptProcessor.deptListResponse.data.onChange((changeData) => {
      if (changeData.value) {
        this.deptTreeList.set(arrayToTree(changeData.value));
      }
    });
  };

  /**
   * 保存和修改租户租
   */
  saveUpdateModalRole = async (role: IRoleEntity) => {
    const type = this.modalProcessor?.modalData?.get?.()?.type;
    let request = this.roleProcessor.createRole;
    if (type === 'rename') {
      request = this.roleProcessor.updateRole;
    }
    return request(role);
  };

  saveUpdateModalDept = async (dept: IDeptEntity) => {
    const type = this.modalProcessor?.modalData?.get?.()?.type;
    let request = this.deptProcessor.createDept;
    if (type === 'rename') {
      request = this.deptProcessor.updateDept;
    }
    return request(dept);
  };

  /**
   * 设置部门选中的数据
   * @param data
   */
  setSelectData = (data: { id: string; name: string }) => {
    this.selectData.set(data);
  };
}

export const createInternalProcessor = () => {
  let processor: null | InternalProcessor = new InternalProcessor();

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
