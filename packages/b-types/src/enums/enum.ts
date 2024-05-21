/**
 * 本地存储相关key枚举
 */
export enum ELocationStorageKey {
  // 应用id
  'appId' = 'appId',
  // lowcode插件是否注册过
  'loweCodePluginIsRegistered' = 'lcpIsRegistered',

  'token' = 'user_token',

  // 租户id
  'tenantId' = 'tenant_id',
}

export enum EDefaultResourceGroup {
  /**
   * 仅添加数据
   */
  'ADD' = 'ADD',

  /**
   * 添加和管理本人数据
   */
  'ADD_MANAGER_MY' = 'ADD_MANAGER_MY',

  /**
   * 添加查看所有数据
   */
  'ADD_VIEW_ALL' = 'ADD_VIEW_ALL',

  /**
   * 查看所有数据
   */
  'VIEW_ALL' = 'VIEW_ALL',

  /**
   * 管理所有数据
   */
  'MANAGER_ALL' = 'MANAGER_ALL',
}
