import { IColumnEntity, TFieldType } from '@brick/types';

export interface IDataRenderProps<T extends any = any, E extends TFieldType = any> {
  value: T;
  column: IColumnEntity<E>;
}
