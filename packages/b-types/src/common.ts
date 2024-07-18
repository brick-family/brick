import { DataNode } from 'antd/es/tree';

export type CreateOrUpdateType = 'create' | 'update' | 'copy' | 'rename' | 'move';

/**
 * 排序map
 */
export type TSortMap = Record<string, number>;

/**
 * menu data数据类型
 */
export type TMenuData<T = any> = DataNode & T & { children: Array<TMenuData<T>> };

/**
 * 弹框编辑类型
 */
export interface IModalData<T extends any = any> {
  open: boolean;
  type: CreateOrUpdateType;
  data?: T;
}

/**
 * 基础props
 */
export interface BaseProps {
  style?: React.CSSProperties;
  className?: string;
}
