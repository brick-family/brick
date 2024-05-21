export enum EOpenType {
  /**
   * 弹框
   */
  'modal' = 'modal',
  /**
   * 抽屉
   */
  'drawer' = 'drawer',
}

export type TOpenType = keyof typeof EOpenType;

export enum EMode {
  /**
   * 创建
   */
  'create' = 'create',
  /**
   * 详情
   */
  'detail' = 'detail',
  /**
   * 编辑
   */
  'edit' = 'edit',
}

export type TMode = keyof typeof EMode;

/**
 * 弹框或者抽屉相关props
 */
export interface IOpenProps {
  open: boolean;
}
