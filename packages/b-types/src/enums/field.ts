export enum OperatorCode {
  /**
   * 创建权限
   */
  CREATE = 'create',
  /**
   * 查看权限
   */
  VIEW = 'view',
  /**
   * 复制权限
   */
  COPY = 'copy',
  /*
   * 编辑权限
   */
  EDIT = 'edit',
  /*
   * 批量更新权限
   */
  BATCH_UPDATE = 'batchUpdate',
  /*
   * 删除权限
   */
  DELETE = 'delete',
  /*
   * 打印权限
   */
  PRINT = 'print',
  /*
   * 导出权限
   */
  EXPORT = 'export',
  /**
   * 导入权限
   */
  IMPORT = 'import',
}

export type TOperatorCode = keyof typeof OperatorCode;

/**
 * 租户权限组操作code  create(添加) edit(编辑) delete(删除)
 */
export enum ETenantGroupOperatorCode {
  VIEW = 'view',
  CREATE = 'create',
  DELETE = 'delete',
}

export type TTenantGroupOperatorCode = keyof typeof ETenantGroupOperatorCode;
