import { IRoleEntity, IUserEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';
import { TTransferSelectType } from '../types';
import {
  DeptProcessor,
  deptProcessor,
  roleProcessor,
  RoleProcessor,
  userProcessor,
  UserProcessor,
  appProcessor,
  AppProcessor,
} from '@brick/processor';

export class TransferSelectProcessor {
  // 使用dept processor
  deptProcessor: DeptProcessor;
  roleProcessor: RoleProcessor;
  userProcessor: UserProcessor;
  appProcessor: AppProcessor;

  /**
   *  当前选中的keys
   */
  treeSelectKeys: Observable<Array<string>>;
  targetSelectKeys: Observable<Array<string>>;
  targetKeys: Observable<Array<string>>;
  transferSelectKeys: Observable<Array<string>>;
  userTargetData: Observable<Array<IUserEntity>>;

  userStoreTargetData: Observable<Array<IUserEntity>>;

  sourceKeywords: Observable<string>;

  targetKeywords: Observable<string>;

  type: Observable<TTransferSelectType>;
  constructor() {
    // 初始化dept processor
    this.deptProcessor = deptProcessor;
    this.roleProcessor = roleProcessor;
    this.userProcessor = userProcessor;
    this.appProcessor = appProcessor;
    this.type = observable();
    this.treeSelectKeys = observable([]);
    this.targetSelectKeys = observable([]);
    this.transferSelectKeys = observable([]);
    this.targetKeys = observable([]);
    this.userTargetData = observable([] as IUserEntity[]);
    this.userStoreTargetData = observable([] as IUserEntity[]);
    this.sourceKeywords = observable('' as string);
    this.targetKeywords = observable('' as string);
    this.init();
  }

  // 可以直接获取部门tree data，
  get queryTreeData() {
    return this.deptProcessor.queryDeptAll;
  }

  // queryRoleList = () => {
  //   queryRoleAll().then((res) => {
  //     this.setRoleList(res);
  //   });
  // };

  setTreeSelectKeys = (keys: string[]) => {
    this.treeSelectKeys.set(keys);
  };

  setTargetSelectKeys = (keys: string[]) => {
    this.targetSelectKeys.set(keys);
  };

  setTransferSelectKeys = (keys: string[]) => {
    this.transferSelectKeys.set(keys);
  };

  setTargetKeys = (keys: string[]) => {
    this.targetKeys.set(keys);
  };

  private init = async () => {
    this.listeners();
    // this.queryTreeData();
    // this.queryRoleList();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {
    this.targetKeys.onChange((value) => {
      console.log('linstenTargetKeys', value);
    });
  };

  setUserTargetData = (userTargetData: IUserEntity[]) => {
    this.userTargetData.set(userTargetData);
  };

  setUserStoreTargetData = (userStoreTargetData: IUserEntity[]) => {
    this.userStoreTargetData.set(userStoreTargetData);
  };

  setSourceKeywords = (value: string) => {
    this.sourceKeywords.set(value);
  };

  setTargetKeywords = (value: string) => {
    this.targetKeywords.set(value);
  };

  /**
   * 设置当前类型
   * @param type
   */
  setType = (type: TTransferSelectType) => {
    this.type.set(type);
  };
}

export const createTransferSelectProcessor = () => {
  let processor: null | TransferSelectProcessor = new TransferSelectProcessor();

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
