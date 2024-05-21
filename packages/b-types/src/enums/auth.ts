/**
 * app operator code
 */
export enum EAppOperatorCode {
  'MANAGER' = 'manager',
  'CREATE' = 'create',
  'UPDATE' = 'update',
  'DELETE' = 'delete',
}

export type TAppOperatorCode = keyof typeof EAppOperatorCode;
