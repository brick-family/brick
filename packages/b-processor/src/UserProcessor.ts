import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { observable, Observable } from '@legendapp/state';
import {
  createUser,
  deleteUser,
  distributeDept,
  distributeRole,
  getUserInfo,
  queryUser,
  unDistributeDept,
  unDistributeRole,
  updateUser,
  IResponse,
} from '@brick/services';
import { IUserEntity, IUserInfoVo } from '@brick/types';

export class UserProcessor extends BaseProcessor {
  appList: Observable<IResponseQuery<any>>;
  queryUserResponse: TObservableResponse<IResponse<IUserEntity>>;

  deleteUserResponse: TObservableResponse<boolean>;
  createUserResponse: TObservableResponse<boolean>;
  updateUserResponse: TObservableResponse<boolean>;
  getUserInfoResponse: TObservableResponse<IUserInfoVo>;

  distributeDeptResponse: TObservableResponse<boolean>;

  distributeRoleResponse: TObservableResponse<boolean>;

  unDistributeDeptResponse: TObservableResponse<boolean>;

  unDistributeRoleResponse: TObservableResponse<boolean>;

  constructor() {
    super();
    this.appList = createDefaultResponseQuery();
    this.deleteUserResponse = createDefaultResponseQuery();
    this.createUserResponse = createDefaultResponseQuery();
    this.updateUserResponse = createDefaultResponseQuery();
    this.distributeDeptResponse = createDefaultResponseQuery();
    this.distributeRoleResponse = createDefaultResponseQuery();
    this.unDistributeDeptResponse = createDefaultResponseQuery();
    this.unDistributeRoleResponse = createDefaultResponseQuery();
    this.getUserInfoResponse = createDefaultResponseQuery();
    this.queryUserResponse = createDefaultResponseQuery();

    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};

  get getUserInfo() {
    return withProcessorServiceWrapper(getUserInfo, this.getUserInfoResponse);
  }

  get deleteUser() {
    return withProcessorServiceWrapper(deleteUser, this.deleteUserResponse);
  }

  get createUser() {
    return withProcessorServiceWrapper(createUser, this.createUserResponse);
  }

  get updateUser() {
    return withProcessorServiceWrapper(updateUser, this.updateUserResponse);
  }

  get distributeDept() {
    return withProcessorServiceWrapper(distributeDept, this.distributeDeptResponse);
  }

  get unDistributeDept() {
    return withProcessorServiceWrapper(unDistributeDept, this.unDistributeDeptResponse);
  }

  get distributeRole() {
    return withProcessorServiceWrapper(distributeRole, this.distributeRoleResponse);
  }

  get unDistributeRole() {
    return withProcessorServiceWrapper(unDistributeRole, this.unDistributeRoleResponse);
  }

  get queryUser() {
    return withProcessorServiceWrapper(queryUser, this.queryUserResponse);
  }
}

export const createUserProcessor = () => {
  let processor: null | UserProcessor = new UserProcessor();

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

export const userProcessor = createUserProcessor().processor;
