import {
  ELocationStorageKey,
  IAppEntity,
  IResourceListVo,
  ITenantUserEntity,
  IUserInfoVo,
} from '@brick/types';
import { lpLocalStorage } from '@brick/utils';
import { batch, Observable, observable } from '@legendapp/state';

export class GlobalProcessor {
  // 用户信息
  userInfo: Observable<IUserInfoVo>;

  currTenant: Observable<ITenantUserEntity>;

  appId: Observable<string>;

  /**
   * 是否显示无权页面
   */
  showAuthPage: Observable<boolean>;

  /**
   * 是否是系统管理员
   */
  isAdmin: Observable<boolean>;

  /**
   * 是否是应用管理员
   */
  isAppAdmin: Observable<boolean>;

  /**
   * 资源项
   */
  resources: Observable<IResourceListVo>;

  constructor() {
    this.userInfo = observable<IUserInfoVo>({} as IUserInfoVo);
    this.currTenant = observable<ITenantUserEntity>({} as ITenantUserEntity);
    this.appId = observable('');
    this.showAuthPage = observable(false);
    this.isAdmin = observable(false);
    this.isAppAdmin = observable(false);
    this.resources = observable({} as IResourceListVo);
    this.init();
  }

  private init = async () => {
    this.listeners();
  };
  setUserInfo = (
    userInfo: IUserInfoVo,
    {
      tenantId,
      appId,
    }: {
      tenantId?: string;
      appId?: string;
    }
  ) => {
    const currTenantId =
      tenantId || userInfo?.app?.tenantId || lpLocalStorage.get(ELocationStorageKey.tenantId);
    let tenant = currTenantId && userInfo?.tenantList?.find((f) => f.id == currTenantId);
    if (!tenant) {
      tenant = userInfo?.tenantList?.[0];
    }
    // 设置租户信息
    this.setCurrTenant(tenant);
    this.userInfo.set(userInfo);
  };

  setCurrTenant = (tenant: ITenantUserEntity) => {
    if (tenant) {
      lpLocalStorage.add(ELocationStorageKey.tenantId, tenant?.id);
      this.currTenant.set(tenant);
    }
  };

  setAppId = (appId: string) => {
    this.appId.set(appId);
  };

  setUserInfoApp = (app: IAppEntity) => {
    this.userInfo.app.set(app);
  };

  /**
   * 设置资源项目
   * @param resources
   */
  setResources = (resources: IResourceListVo) => {
    this.resources.set(resources);
  };

  /**
   * 变更admin权限
   */
  private changeAdminPerm = () => {
    const userInfo = this.userInfo.peek();
    const appId = this.appId.peek();
    batch(() => {
      this.isAdmin.set(userInfo?.isAdmin);
      if (appId) {
        const currAppPerm = userInfo?.appPerm?.[appId!];
        this.isAppAdmin.set(userInfo?.isAdmin || currAppPerm?.rights?.length > 0);
      }
    });
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.userInfo.onChange((changeData) => {
      this.changeAdminPerm();
    });

    this.appId.onChange((changeData) => {
      this.changeAdminPerm();
    });
  };
}

// const createProcessor = () => {
//   console.log('q=>a');
//   // @ts-ignore
//   if (window._tmpGp) {
//     return {
//       // @ts-ignore
//       globalProcessor: window._tmpGp,
//     };
//   }
//   console.log('q=>b');
//
//   const getRoot = () => {
//     return globalProcessor;
//   };
//
//   // @ts-ignore
//   window._tmpGp = globalProcessor;
//   return {
//     globalProcessor,
//     getRoot,
//   };
// };
// let { globalProcessor, getRoot } = createProcessor();

// @ts-ignore
const processor = window._tmpGp || window?.parent?._tmpGp;

if (!processor) {
  // @ts-ignore
  window._tmpGp = new GlobalProcessor();
}
// @ts-ignore
const globalProcessor = window._tmpGp || window?.parent?._tmpGp;

export { globalProcessor };
