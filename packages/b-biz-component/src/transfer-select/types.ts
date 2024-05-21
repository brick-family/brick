export enum ETransferSelectType {
  'role' = 'role',
  'user' = 'user',
  'dept' = 'dept',
  'app' = 'app',
}

/**
 * 支持的transfer类型
 */
export type TTransferSelectType = keyof typeof ETransferSelectType;
