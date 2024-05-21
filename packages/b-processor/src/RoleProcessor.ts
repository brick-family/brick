import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';

import {
  createRole,
  deleteRole,
  IQueryRoleParams,
  queryRoleAll,
  updateRole,
} from '@brick/services';
import { IRoleEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { TransferItem } from 'antd/es/transfer';

export type IRoleProps = IRoleEntity & TransferItem;
export class RoleProcessor extends BaseProcessor {
  /**
   * 角色列表
   */
  roleList: Observable<IResponseQuery<Array<IRoleEntity>>>;

  /**
   * 角色列表请求参数
   */
  roleDataRequestParams: Observable<IQueryRoleParams>;

  createRoleResponse: TObservableResponse<boolean>;

  deleteRoleResponse: TObservableResponse<boolean>;

  updateRoleResponse: TObservableResponse<boolean>;

  selectRoles: string[];

  constructor() {
    super();
    this.roleList = createDefaultResponseQuery();
    this.roleDataRequestParams = observable({ pageSize: 10, currentPage: 1 } as IQueryRoleParams);
    this.createRoleResponse = createDefaultResponseQuery();
    this.deleteRoleResponse = createDefaultResponseQuery();
    this.updateRoleResponse = createDefaultResponseQuery();
    this.selectRoles = observable([]);

    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {};

  /**
   * 请求当前应用角色数据
   * @returns
   */
  get requestRoleListAll() {
    return withProcessorServiceWrapper(queryRoleAll, this.roleList);
  }

  /**
   * 创建资源
   */
  get createRole() {
    return withProcessorServiceWrapper(createRole, this.createRoleResponse);
  }

  /**
   * 修改资源
   */
  get updateRole() {
    return withProcessorServiceWrapper(updateRole, this.updateRoleResponse);
  }

  /**
   * 删除资源
   */
  get deleteRole() {
    return withProcessorServiceWrapper(deleteRole, this.deleteRoleResponse);
  }

  /**
   * 刷新数据
   */
  refresh = () => {
    this.requestRoleListAll();
  };
}

export const createRoleProcessor = () => {
  let processor: null | RoleProcessor = new RoleProcessor();

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

export const roleProcessor = createRoleProcessor().processor;
