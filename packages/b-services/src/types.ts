import { useMutation } from '@tanstack/react-query';

export interface IQueryPage {
  currentPage: number;
  pageSize: number;
}

export interface IResponse<T extends any> {
  /**
   * 总条数
   */
  total: number;

  /**
   * 当前页
   */
  current: number;

  /**
   * 总条数
   */
  pages: number;

  /**
   * 返回的当前也数据
   */
  records: T[];
}

/**
 * react query mutation 类型
 */
export type TUseMutationOptions = Parameters<typeof useMutation>[2];
